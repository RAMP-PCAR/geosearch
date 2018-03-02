import { SearchConfig } from './index'
import { Province, list as ProvinceList } from './provinces';

type serviceUrlsI = {geoNameUrl: string, geoLocateUrl: string};

class Query {
    urls: serviceUrlsI;

    constructor(urls: serviceUrlsI) {
        this.urls = urls;
    }

    jsonRequest(url: string): Promise<locateResponseList | rawGeoNameResp> {
        return new Promise((resolve, reject) => {
            const xobj = new XMLHttpRequest();
            xobj.open('GET', url, true);
            xobj.responseType = 'json';
            xobj.onload = function() {
                if (xobj.status === 200) {
                    resolve(typeof xobj.response === 'string' ? JSON.parse(xobj.response) : xobj.response);
                } else {
                    reject('Could not load results from remote service.');
                }
            };
            xobj.send();
        });
    }
}

export interface SearchResponse {
    name: string,
    location: string,
    province: Province,
    concise: string,
    latlon: latLon,
    bbox: Array<number>
}

interface geoNameResp {
    name: string,
    location: string,
    province: {code: string},
    concise: { code: string },
    latitude: number,
    longitude: number,
    bbox: Array<number>,
}

interface rawGeoNameResp {
    items: Array<geoNameResp>
}

type searchRestrictions = NTSQuery | FSAQuery | Province | latLon | Array<number>;

export class Search extends Query {
    concise: Array<string>;
    url: string = this.urls.geoNameUrl;

    setConcise(concise: Array<string>) {
        this.url += `&concise=${concise.join(',')}`;
    }

    setRestriction(restrict: searchRestrictions) {
        let rOnBbox: Bbox | undefined;
        let rOnLatlon: latLon | undefined;
        let rOnProvince: Province | undefined;

        if (restrict instanceof NTSQuery) {
            rOnBbox = restrict.bbox;
        } else if(restrict instanceof FSAQuery) {
            rOnLatlon = restrict.latlon;
        } else if(isLatlong(restrict)) {
            rOnLatlon = restrict;
        } else if (restrict instanceof Province) {
            rOnProvince = restrict;
        } else if (isBbox(restrict)) {
            rOnBbox = restrict;
        }

        if (rOnBbox) {
            this.url += '&bbox=' + rOnBbox.join(',');
        } else if(rOnLatlon) {
            this.url += `&lat=${rOnLatlon.lat}&lon=${rOnLatlon.lon}`;
        }

        if (rOnProvince) {
            this.url += `&province=${rOnProvince.code}`;
        }
    }

    query(q: string): Promise<Array<SearchResponse>> {
        return new Promise((resolve, reject) => {
            this.jsonRequest(this.url + (q ? '&q=' + q : '')).then(j => {
                if (isNameResult(j)) {
                    const items = j.items;
                    if (items.length === 0)
                        reject('No results found.');

                    resolve(items.map(i => {
                        const province = ProvinceList.find(p => p.code === parseInt(i.province.code));
                        if (!province)
                            throw new Error('Province code returned is invalid.');
                        
                        return {
                            name: i.name,
                            location: i.location,
                            province: province,
                            concise: i.concise.code,
                            latlon: {lat: i.latitude, lon: i.longitude},
                            bbox: i.bbox
                        }
                    }));
                }
            });
        });
    }
}

/** 
 * National Topographic System (NTS)
 * 
 * The following definitions have the form "name (value constraints) - description"
 * 
 * Sheet (two or three digits)      - aka "Map Numbers" are blocks of approximately 4,915,200 hectares. 
 * Map Units Subdivision ([A-P])    - each sheet is subdivided further into 16 blocks, approximately 307,200 hectares
 * Map Sheet Unit ([1-16])          - each map unit is subdivided further into 16 blocks, approximately 19,200 hectares
 * Blocks ([A-L])                   - each map sheet unit is subdivided further into 12 blocks, approximately 1600 hectares
 * Units ([1-100]*)                 - each block is finally divided into 100 units, approximately 64 hectares
 * 
 * Two subsets of the complete NTS format is supported:
 *     - Sheet and Map Unit Subdivision (called baseNTS here)
 *     - Sheet, Map Unit Subdivision, and Map Sheet Unit (called fullNTS here)
 * 
 * Note that "Blocks" and "Units" are currently not supported on geogratis and are ignored on the query.
*/
const baseNTSCache: {[key: string]: Promise<NTSQuery>} = {};
export class NTSQuery extends Query {
    baseNTS: string;
    fullNTS: {[key: string]: NTSQuery} = {};
    location: string;
    latLon: latLon;
    bbox: Array<number>;

    populate(result: locateResponse): void {
        const location = result.title.split(' ');
        const fullNTSName = location.shift() || '';

        const popI = fullNTSName === this.baseNTS ? this : new NTSQuery(this.urls);
        popI.baseNTS = this.baseNTS;
        popI.location = location.join(' ');
        popI.latLon = { lat: result.geometry.coordinates[1], lon: result.geometry.coordinates[0]};
        popI.bbox = result.bbox ? result.bbox : [];
        
        if (popI !== this)
            this.fullNTS[fullNTSName] = popI;
    }

    query(q: string): Promise<NTSQuery> {
        let originalQuery = q = q.toUpperCase();
        let takeFirstThree = q.substring(0,3);
        // if third character is a letter, we pad query with a leading 0 for caching uniformity
        if (takeFirstThree.length === 3 && !parseInt(takeFirstThree[2]))
            originalQuery = q = ('0' + q);

        // we only perform a location search on the baseNTS, since the service also provides all fullNTS results.
        q = q.substring(0, 4);

        return new Promise((resolve, reject) => {
            // exists in the cache
            if (baseNTSCache[q]) {
                if (q !== originalQuery)
                    baseNTSCache[q].then(nts => nts.fullNTS[originalQuery] ? resolve(nts.fullNTS[originalQuery]) : (originalQuery.length === 5 ? resolve(nts) : reject('NTS not valid.')));
                else
                    baseNTSCache[q].then(nts => nts ? resolve(nts) : reject('NTS not valid.'));

                return;
            }

            this.baseNTS = q;

            baseNTSCache[this.baseNTS] = this.jsonRequest(this.urls.geoLocateUrl + '?q=' + this.baseNTS).then(resp => {
                if (isLocateResult(resp)) {
                    resp.forEach(r => this.populate(r));
                    resolve(originalQuery === this.baseNTS ? this : this.fullNTS[originalQuery]);
                }
                reject('Not Found.');
                return this;
            });
        });
    }
}

const FSACache: {[key: string]: Promise<FSAQuery>} = {};
export class FSAQuery extends Query {
    latlon: latLon;
    fsa: string;
    provinces: Array<Province>;

    query(q: string): Promise<FSAQuery> {
        this.fsa = q.substring(0,3).toUpperCase();

        return new Promise((resolve, reject) => {
            if (FSACache[this.fsa]) {
                FSACache[this.fsa].then(fsa => resolve(fsa)).catch(err => reject('FSA not found.'));
                return;
            }

            FSACache[this.fsa] = this.jsonRequest(this.urls.geoLocateUrl + '?q=' + q).then(j => {
                if (isLocateResult(j) && j.length === 1) {
                    this.latlon = { lat: j[0].geometry.coordinates[1], lon:  j[0].geometry.coordinates[0] };
                    this.provinces = ProvinceList.filter(p => p.containsFSA(this.fsa || ''));
                    resolve(this);
                }
                reject('FSA not found.');
                return this;
            });
        });
    }
}

type locateResponseList = Array<locateResponse>;

interface locateResponse {
    title: string,
    bbox?: Array<number>,
    geometry: { coordinates: Array<number> }
}

function isLocateResult(result): result is locateResponseList {
    return !result.items;
}

function isNameResult(result): result is rawGeoNameResp {
    return result && result.items;
}

function isLatlong(result): result is latLon {
    return typeof result === 'object' && result['lat'] && result['lon'];
}

function isBbox(result): result is Bbox {
    return typeof result === 'object' && result.length === 4 && result.every(v => typeof v === 'number');
}

type Bbox = Array<number>;

export interface latLon {
    lat: number,
    lon: number
}