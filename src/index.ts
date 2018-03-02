import { Search, NTSQuery, FSAQuery, latLon, SearchResponse } from './query';
import { Province, search as ProvSearch } from './provinces';
import { Type as TypeI, make as newType} from './types';

const GEO_LOCATE_URL = 'https://geogratis.gc.ca/services/geolocation/${language}/locate';
const GEO_NAMES_URL = 'https://geogratis.gc.ca/services/geoname/${language}/geonames.json?category=O';

const queryHistory = {};

export interface userConfig {
    includeTypes?: string | Array<string>,
    excludeTypes?: string | Array<string>,
    language?: string,
    geoLocateUrl?: string,
    geoNameUrl?: string,
    sortByTypes?: Array<string>
}

export class SearchConfig {
    language: string;
    Type: TypeI;
    urls: {
        geoNameUrl: string,
        geoLocateUrl: string
    };
    sortByTypes: Array<string>;

    constructor(uConfig?: userConfig) {
        uConfig = uConfig ? uConfig : {};
        this.urls = {
            geoLocateUrl: uConfig.geoLocateUrl ? uConfig.geoLocateUrl : GEO_LOCATE_URL,
            geoNameUrl: uConfig.geoNameUrl ? uConfig.geoNameUrl : GEO_NAMES_URL
        };
        this.language = uConfig.language ? uConfig.language : 'en';
        this.urls.geoLocateUrl = this.urls.geoLocateUrl.replace('${language}', this.language);
        this.urls.geoNameUrl = this.urls.geoNameUrl.replace('${language}', this.language);
        this.Type = newType(uConfig.includeTypes, uConfig.excludeTypes);
        this.sortByTypes = uConfig.sortByTypes ? uConfig.sortByTypes : ['PROV', 'TERR', 'CITY', 'TOWN', 'VILG', 'UNP'];
    }
}

export class GeoSearch extends SearchConfig {
    query: string;
    nameSearch: string | undefined;
    results: Search | NTSQuery | FSAQuery | Province;

    input(value: string) {
        if (!value || value.length < 3 || /^\d{3}$/.test(value))
            return;
        
        this.query = value;
        let x = this.decompose(value);
        
        if (x === true)
            return;

        if (this.results instanceof Province) {
            return this.results;
        } else if (this.results) {
            return this.results.query(x);
        }
    }

    UI(config?: UIconfig): UI {
        return new UI(this, config);
    }

    radialComposition(q: string): string | boolean {
        if (/\s(?:near|près du)$/.test(q))
            return true;

        const radialSplit = q.split(this.language === 'en' ? ' near ' : ' près du ').map(v => v.trim());

        if (radialSplit.length !== 2)
            return false;

        const radialV = radialSplit[1];

        if (this.isProvince(radialV))
            throw new Error('Cannot do radial search (near) with provinces.');

        const isLocateType = this.isLocateQuery(radialV);
        const latlon = radialV.split(',').map(v => parseFloat(v.trim()));
        
        if (isLocateType || latlon) {
            this.results = new Search(this.urls);
            this.results.setRestriction(isLocateType || latlon);

            return radialSplit[0];
        }

        return true;
    }

    boundedComposition(q: string): string | boolean {
        if (/\s(?:in|au)$/.test(q))
            return true;

        const boundedSplit = this.query.split(this.language === 'en' ? ' in ' : ' au ').map(v => v.trim());

        if (boundedSplit.length !== 2)
            return false;

        const boundV = boundedSplit[1];
        const isLoc = this.hasProvinceOrLocateRestriction(boundV);
        const bboxSplit = boundV.split(',').map(v => parseFloat(v.trim()));

        if (isLoc instanceof FSAQuery)
            throw new Error('Cannot do bounded search (in) with FSA codes at this time.');
        else if (isLoc || bboxSplit.length === 4) {
            this.results = new Search(this.urls);
            this.results.setRestriction(isLoc || bboxSplit);

            return boundedSplit[0];
        }
        return true;
    }

    commaComposition(q: string): string | false {
        const commaSplit = this.query.split(',').map(v => v.trim());

        if (commaSplit.length !== 2)
            return false;

        const isProvince = this.isProvince(commaSplit[1]);
        if (!isProvince)
            return commaSplit[0];

        this.results = isProvince;
        return commaSplit[0];
    }

    decompose(q: string): string | true {
        q = q.trim();
        const uniqueSearches = this.commaComposition(q) || this.boundedComposition(q) || this.radialComposition(q);

        if (!uniqueSearches) {
            this.results = new Search(this.urls);
            return q;
        } 

        return uniqueSearches;
    }

    hasProvinceOrLocateRestriction(q: string): Province | NTSQuery | FSAQuery | false {
        const isProvince = this.isProvince(q);
        const isLocateQuery = !isProvince ? this.isLocateQuery(q) : false;
        return isProvince || isLocateQuery;
    }

    isProvince(q: string): Province | false {
        return ProvSearch(q.trim());
    }

    isLocateQuery(q: string): NTSQuery | FSAQuery | false {
        if (/^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]\d[A-Za-z]/.test(q)) {
            const newQ = new FSAQuery(this.urls);
            newQ.query.bind(newQ, q.toUpperCase());
            return newQ;
        } else if (/^\d{2,3}[A-Pa-p]/.test(q)) {
            const newQ = new NTSQuery(this.urls);
            newQ.query.bind(newQ, q.toUpperCase());
            return newQ;
        } else {
            return false;
        }
    }

    typesInName(q: string): string | false {
        const regx = new RegExp(/.*(\((.+)\))/);
        const regxResult = regx.exec(q);

        if (regxResult) {
            regxResult[2].split(',').map(type => {
                let checkedType = this.Type.isValid(type);
                if (checkedType)
                    this.Type.validSet.push(checkedType);
            });
            return q.replace(regxResult[1], '');
        }
        return false;
    }
}

class UI {
    private resultHandler: resultHandler;
    private resultElem: HTMLElement;
    private featureHandler: featureHandler;
    private featureElem: HTMLElement;
    private inputElem: HTMLInputElement;
    private docFrag: DocumentFragment;
    private inputValue: string;
    private search: GeoSearch;

    constructor(search: GeoSearch, config?: UIconfig, ) {
        this.search = search;
        this.docFrag = document.createDocumentFragment();
        this.makeConfig(config || {});
        this.domBindings();
    }

    makeConfig(config: UIconfig): void {
        this.resultHandler = config.handleResults ? config.handleResults.bind(this) : this.defaultResultHandler;
        this.featureHandler = config.handleFeatures ? config.handleFeatures.bind(this) : this.defaultFeatureHandler;
        this.inputElem = config.inputElem ? config.inputElem : document.createElement('input');
        this.resultElem = config.resultElem ? config.resultElem : document.createElement('div');
        this.featureElem = config.featureElem ? config.featureElem : document.createElement('div');
    }

    domBindings() {
        this.docFrag.appendChild(this.featureElem);
        this.docFrag.appendChild(this.resultElem);
        this.docFrag.appendChild(this.inputElem);

        this.inputElem.onkeyup = this.hasQueryChanged.bind(this);
    }

    hasQueryChanged(evt: KeyboardEvent | string) {
        const qValue = typeof evt === 'string' ? evt : (<HTMLInputElement>evt.target).value;

        if (qValue === this.inputValue) {
            setTimeout(() => this.hasQueryChanged(qValue), 200);
            return false;
        } else {
            this.inputValue = qValue;
            this.inputHasChanged(qValue);
            return true;
        }
    }

    
    inputHasChanged(query: string) {
        
        const qValue = query;
        
        while (this.resultElem.firstChild) {
            this.resultElem.removeChild(this.resultElem.firstChild);
        }

        while (this.featureElem.firstChild) {
            this.featureElem.removeChild(this.featureElem.firstChild);
        }

        let searchResult = this.search.input(qValue);

        if (!searchResult)
            return;


        (<Promise<any>>searchResult).then(console.error);
        if (searchResult instanceof NTSQuery) {
            (<Promise<NTSQuery | null>>searchResult).then(v => console.error(v));
        } else if (searchResult instanceof FSAQuery) {
            (<Promise<FSAQuery | null>>searchResult).then(v => console.error('FSA Result:', v));
        } else if (searchResult instanceof Search) {
            (<Promise<Array<SearchResponse>>>searchResult).then(v => console.error(v));
        } else if (searchResult instanceof Province) {
            console.error('Province: Result', searchResult);
        }
    }

    optimizeSortByType(sortByTypes: Array<string>): genericNumberObjectType {
        const returnObj = {};
        sortByTypes.forEach((x, i) => {
            returnObj[x] = i;
        });

        return returnObj;
    }

    defaultResultHandler(results): HTMLElement {
        const ul = document.createElement('ul');
        
        results.reverse().forEach(r => {
            const li = document.createElement('li');
            li.innerHTML = `${r.name} (${r.type.name})${r.location ? ', ' + r.location : ''}, ${r.province.name} @ lat: ${r.latLon.lat}, lon: ${r.latLon.lon}`;
            ul.appendChild(li);
        });

        return ul;
    }

    defaultFeatureHandler(fR) {
        let output;

        //if (isFSAResult(fR)) {
          //  output = `${fR.fsa} - FSA located in ${fR.province} @ lat: ${fR.latLon.lat}, lon: ${fR.latLon.lon}`;
        //} else {
       //     output = `${fR.nts} - NTS located in ${fR.location} @ lat: ${fR.latLon.lat}, lon: ${fR.latLon.lon}`;
       // }

       // const p = document.createElement('p');
        //p.innerHTML = output;
       // return p;
    }

   

    get htmlElem(): DocumentFragment  {
        return this.docFrag;
    }
}

if ((<any>window)) {
    (<any>window).GeoSearch = GeoSearch;
}


interface UIconfig {
    handleResults?:     resultHandler,
    handleFeatures?:    featureHandler,
    resultElem?:        HTMLElement,
    featureElem?:       HTMLElement
    inputElem?:         HTMLInputElement
}

interface resultHandler {
    (results: any): HTMLElement
}

interface featureHandler {
    (results: any): HTMLElement
}

export interface genericObjectType {
    [key: string]: string
}

export interface genericNumberObjectType {
    [key: string]: number
}
