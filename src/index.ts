import { Search, NTSQuery, FSAQuery, latLon, SearchResponse } from './query';
import { Province, search as ProvSearch } from './provinces';
import { Type as TypeI, make as newType} from './types';
import * as dmp from './diff_match_patch';



const dataCache = {
    NTS: {},
    FSA: {}
};

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

type Result = Search | NTSQuery | FSAQuery | Province;

export class GeoSearch extends SearchConfig {
    query: string;
    prevQuery: string;
    private _ui: UI;
    nameSearch: string | undefined;
    results: Search | NTSQuery | FSAQuery | Province;
    conciseFilter: Set<string> = new Set();

    search(value: string): Promise<Result> {
        return new Promise((resolve, reject) => {
            if (!value || value.length < 3 || /^\d{3}$/.test(value))
                reject(false);
        
            this.prevQuery = this.query;
            this.query = value.toLowerCase();

            // Halt search if concise types are not fully entered or valid i.e. Toronto (City
            // Concise types will be processed when the closing bracket is added
            let hasType;
            if (/.* \(.{3,}/.test(value))
                (hasType = this.typesInName(this.query)) ? this.query = hasType : reject(true);


            const breakDown = this.breakDown(value)
        });
    }

    UI(config?: any): UI {
        if (!this._ui)
            this._ui = new UI(this);
        
        return this._ui;
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

        if (commaSplit.length === 2)
            return false;

        const isProvince = this.isProvince(commaSplit[1]);
        if (!isProvince)
            return commaSplit[0];

        this.results = isProvince;
        return commaSplit[0];
    }

    breakDown(q: string): string | true {
        q = q.trim();
        const uniqueSearches = this.commaComposition(q) || this.boundedComposition(q) || this.radialComposition(q);

        if (!uniqueSearches) {
            this.results = new Search(this.urls);
            return q;
        } 

        return uniqueSearches;
    }

    isProvOrNTS(q: string): Province | NTSQuery | false {
        return this.isProvince(q) || /^\d{2,3}[A-Pa-p]/.test(q);
    }

    hasProvinceOrLocateRestriction(q: string): Province | NTSQuery | FSAQuery | false {
        const isProvince = this.isProvince(q);
        const isLocateQuery = !isProvince ? this.isLocateQuery(q) : false;
        return isProvince || isLocateQuery;
    }

    isProvince(q: string): Province | false {
        return ProvSearch(q.trim());
    }

    isNTS(q: string): NTSQuery | false {
        if (/^\d{2,3}[A-Pa-p]/.test(q)) {
            const newQ = new NTSQuery(this.urls);
            newQ.query.bind(null, q.toUpperCase());
            dataCache.NTS
            return newQ;
        }
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

    /**
     * Finds concise types of the form `Place name (City[, Town])`. If found it returns the provided query without the concise types, as in "Place name".
     * Returns false if no valid types are found.
     * 
     * @param q full or particial string query
     */
    typesInName(q: string): string | false {
        const regx = new RegExp(/.*( \((.+)\))/);
        const regxResult = regx.exec(q);
        let hasValidTypes = false;

        if (regxResult) {
            hasValidTypes = regxResult[2].split(',').map(type => {
                let checkedType = this.Type.isValid(type);
                return checkedType ? !!this.conciseFilter.add(checkedType) : false;
            }).some(t => t);
            return q.replace(regxResult[1], '');
        }
        return hasValidTypes;
    }
}


class resultParser {
    result(r: FSAQuery | NTSQuery | Province | Search) {
        if(r instanceof Search)
            r.this.SearchResult(r);
    }

    SearchResult(r: Search): HTMLElement {

    }
}

class UI {
    private resultProcessor: any;
    private resultElem: HTMLElement;
    private featureElem: HTMLElement;
    private inputElem: HTMLInputElement;
    private docFrag: DocumentFragment;
    private inputValue: string;
    private search: GeoSearch;

    constructor(search: GeoSearch) {
        this.search = search;
        this.docFrag = document.createDocumentFragment();
        this.makeConfig(config || {});
        this.domBindings();
    }

    makeConfig(config: any): void {
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


export interface genericObjectType {
    [key: string]: string
}

export interface genericNumberObjectType {
    [key: string]: number
}
