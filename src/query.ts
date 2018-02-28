import * as defs from './definitions';
import { SearchConfig } from './index'
import * as Provinces from './provinces';

export class Q {
    config: SearchConfig;
    query: string | null;
    featureResults: defs.queryFeatureResults;
    suggestions: defs.NTSResultList = [];
    _results: defs.nameResultList = [];
    onComplete: Promise<this>;

    constructor(config: SearchConfig, query?: string) {
        this.query = query || null;
        this.config = config;
    }

    set results(results: defs.nameResultList) {
        
        //results.sort((a, b) => {
            //return this.config.sortByTypes[a.type.code] - this.config.sortByTypes[b.type.code] || 1;
       // });
        
        this._results = results;
    }

    get results(): defs.nameResultList {
        return this._results;
    }

    private getUrl(useLocate?: boolean, restrict?: Array<number>, altQuery?: string, lat?: number, lon?: number): string {
        let url = '';
        let query = altQuery ? altQuery : this.query;
        if (useLocate) {
            url = this.config.geoLocateUrl + '?q=' + query;
        
        } else if (lat && lon) {
            url = `${this.config.geoNameUrl}?lat=${lat}&lon=${lon}`;
        
        } else {
            url = `${this.config.geoNameUrl}?q=${query}`;
        }

        if (restrict) {
            if (restrict.length === 4) {
                url += `&bbox=${restrict.join(',')}`;
            } else {
                url += `&province=${restrict.join(',')}`;
            }
        }

        return url;
    }

    normalizeNameItems(items: Array<defs.nameResponse>): defs.nameResultList {
        return items.filter(i => this.config.types.filteredConciseToList[i.concise.code]).map(i => {
            const province = this.config.provinces.find(p => p.code === i.province.code);
            return {
                name: i.name,
                location: i.location,
                province: {
                    name: province && province[this.config.language] || 'Not Found',
                    code: i.province.code
                },
                type: i.concise.code,
                latLon: { lat: i.latitude, lon: i.longitude},
                bbox: i.bbox
            }
        });
    }

    search(restrict?: Array<number>): Promise<defs.nameResultList> {
       return (<Promise<defs.rawNameResult>>this.jsonRequest(this.getUrl(false, restrict))).then(r => this.normalizeNameItems(r.items));
    }

    nameByLatLon(lat: number, lon: number, restrict?: Array<number>): Promise<defs.nameResultList> {
        return (<Promise<defs.rawNameResult>>this.jsonRequest(this.getUrl(false, restrict, undefined, lat, lon))).then(r => this.normalizeNameItems(r.items));
    }

    locateByQuery(altQuery?: string): Promise<defs.locateResponseList> {
        return (<Promise<defs.locateResponseList>>this.jsonRequest(this.getUrl(true, undefined, altQuery)));
    }

    jsonRequest(url: string) {
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

class Query {
    config: SearchConfig;
    restrictByProvince: Array<number>;
    restrictByBbox: Array<number>;
    restrictByLatLon: latLon;

    constructor(config: SearchConfig) {
        this.config = config;
    }

    search(q: string | undefined) {
        let url = this.config.geoNameUrl + '?v=1';
        url = q ? url + '&q=' + q : url;
    }

    jsonRequest(url: string): Promise<locateResponseList> {
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

export interface NTSResult {
    nts: string, // 064D or 064D06
    location: string, // "NUMABIN BAY"
    code: string, // "NTS"
    desc: string, // "National Topographic System"
    latLon: latLon,
    bbox: Array<number>
}

const fullNTSCache = {};

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
export class NTSQuery extends Query {
    baseNTS: string;
    fullNTS: {[key: string]: NTSQuery} = {};
    location: string;
    latLon: latLon;
    bbox: Array<number>;

    query(q: string): Promise<NTSQuery | null> {
        let originalQuery = q;
        return new Promise((resolve, reject) => {
            let subNTS3 = q.substring(0,3).toUpperCase();
            if (subNTS3.length === 3 && !parseInt(subNTS3[2]))
                originalQuery = q = '0' + q;

            q = q.substring(0, 4);

            if (fullNTSCache[q])
                resolve(fullNTSCache[q]);

            this.baseNTS = q;

            this.jsonRequest(this.config.geoLocateUrl + '?q=' + this.baseNTS).then(j => {
                if (isLocateResult(j)) {
                    j.forEach(fullNTS => {
                        const newNTS = new NTSQuery(this.config);
                        const location = fullNTS.title.split(' ');
                        const fullNTSName = location.shift() || '';
                        newNTS.baseNTS = this.baseNTS;
                        newNTS.location = location.join(' ');
                        newNTS.latLon = { lat: fullNTS.geometry.coordinates[1], lon: fullNTS.geometry.coordinates[0]};
                        
                        if (fullNTS.bbox)
                            newNTS.bbox = fullNTS.bbox;

                        this.fullNTS[fullNTSName] = newNTS;
                    });

                    if (originalQuery === this.baseNTS) {
                        resolve(this);
                    } else {
                        resolve(this.fullNTS[originalQuery]);
                    }
                }
                reject('Not Found.');
            });
            
        });
    }
}

export class FSAQuery extends Query {
    latlon: defs.latLon;
    fsa: string;
    provinces: Array<Provinces.ProvinceI>;

    query(q: string): Promise<FSAQuery | null> {
        this.fsa = q.substring(0,3).toUpperCase();
        return this.jsonRequest(this.config.geoLocateUrl + '?q=' + q).then(j => {
            if (isLocateResult(j) && j.length === 1) {
                this.latlon = { lat: j[0].geometry.coordinates[1], lon:  j[0].geometry.coordinates[0] };
                this.provinces = this.config.provinces.filter(p => p.containsFSA(this.fsa || ''));
                return this;
            }
            return null;
        });
    }
}



type locateResponseList = Array<locateResponse>;

export interface locateResponse {
    title: string,
    bbox?: Array<number>,
    geometry: { coordinates: Array<number> }
}

export function isLocateResult(result: locateResponseList): result is locateResponseList {
    return !!(<locateResponseList>result).length;
}

export interface FSAResult {
    fsa: string, // "H0H"
    code: string, // "FSA"
    desc: string, // "Forward Sortation Area"
    provinces: Array<Provinces.ProvinceI>,
    latLon: latLon
}

export interface latLon {
    lat: number,
    lon: number
}