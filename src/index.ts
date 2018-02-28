import * as Q from './query';
import * as Provinces from './provinces';
import * as Types from './types';
import * as defs from './definitions';

const GEO_LOCATE_URL = 'https://geogratis.gc.ca/services/geolocation/${language}/locate';
const GEO_NAMES_URL = 'https://geogratis.gc.ca/services/geoname/${language}/geonames.json';

let lastQuery: string;

const queryHistory = {};

class UI {
    private resultHandler: resultHandler;
    private resultElem: HTMLElement;
    private featureHandler: featureHandler;
    private featureElem: HTMLElement;
    private inputElem: HTMLInputElement;
    private docFrag: DocumentFragment;
    private inputValue: string;

    constructor(config?: UIconfig) {
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

        if (qValue && qValue.length > 2 && qValue !== this.inputValue) {
            this.inputValue = qValue;
            setTimeout(() => this.hasQueryChanged(qValue), 200);
            return false;
        } else {
            this.inputHasChanged(qValue);
            return true;
        }
    }

    
    inputHasChanged(query: string) {
        
        const qValue = (<HTMLInputElement>evt.target).value;

        if (qValue.length < 3 || evt.keyCode === 16 || evt.keyCode === 17)
            return;
        
        while (this.resultContainer.firstChild) {
            this.resultContainer.removeChild(this.resultContainer.firstChild);
        }

        while (this.featureContainer.firstChild) {
            this.featureContainer.removeChild(this.featureContainer.firstChild);
        }

        this.query(qValue).onComplete.then(q => {                
            if (q.featureResults) {
                this.featureContainer.appendChild(this.featureHandler(q.featureResults));
            }

            this.resultContainer.appendChild(this.resultHandler(q.results));
        }).catch(err => {
            const p = document.createElement('p');
            p.innerHTML = err;
            this.resultContainer.appendChild(p);
        });   

    }

    optimizeSortByType(sortByTypes: Array<string>): defs.genericNumberObjectType {
        const returnObj = {};
        sortByTypes.forEach((x, i) => {
            returnObj[x] = i;
        });

        return returnObj;
    }

    defaultResultHandler(results: defs.nameResultList): HTMLElement {
        const ul = document.createElement('ul');
        
        results.reverse().forEach(r => {
            const li = document.createElement('li');
            li.innerHTML = `${r.name} (${r.type.name})${r.location ? ', ' + r.location : ''}, ${r.province.name} @ lat: ${r.latLon.lat}, lon: ${r.latLon.lon}`;
            ul.appendChild(li);
        });

        return ul;
    }

    defaultFeatureHandler(fR: defs.queryFeatureResults): HTMLElement {
        let output;

        if (defs.isFSAResult(fR)) {
            output = `${fR.fsa} - FSA located in ${fR.province} @ lat: ${fR.latLon.lat}, lon: ${fR.latLon.lon}`;
        } else {
            output = `${fR.nts} - NTS located in ${fR.location} @ lat: ${fR.latLon.lat}, lon: ${fR.latLon.lon}`;
        }

        const p = document.createElement('p');
        p.innerHTML = output;
        return p;
    }

   

    get htmlElem(): DocumentFragment  {
        return this.docFrag;
    }
}

export class SearchConfig {
    language: string;
    types: Types.TypeI;
    provinces: Array<Provinces.ProvinceI>;
    geoNameUrl: string;
    geoLocateUrl: string;
    sortByTypes: Array<string>

    constructor(uConfig?: defs.userConfig) {
        uConfig = uConfig ? uConfig : {};
        this.language = uConfig.language ? uConfig.language : 'en';
        
        // set default URLS if none provided and search/replace language in string (if exists)
        this.geoLocateUrl = uConfig.geoLocateUrl ? uConfig.geoLocateUrl : GEO_LOCATE_URL;
        this.geoNameUrl = uConfig.geoNameUrl ? uConfig.geoNameUrl : GEO_NAMES_URL;
        this.geoLocateUrl = this.geoLocateUrl.replace('${language}', this.language);
        this.geoNameUrl = this.geoNameUrl.replace('${language}', this.language);
        
        this.types = Types.make();
        this.types.filterValidTypes(uConfig.includeTypes, uConfig.excludeTypes);
        
        this.provinces = Provinces.list;
        
        this.sortByTypes = uConfig.sortByTypes ? uConfig.sortByTypes : ['PROV', 'TERR', 'CITY', 'TOWN', 'VILG', 'UNP'];
    }
}

class GeoSearch extends SearchConfig {
    query: string;
    nameSearch: string;
    splitQuery: Array<string>;
    radial?: defs.latLon;
    bounded?: Array<number>;
    FSAregex = /^[ABCEGHJKLMNPRSTVXY]\d[A-Z]/;
    NTSregex = /^\d{2,3}[A-P]/;

    constructor(uConfig?: defs.userConfig) {
        super(uConfig);
    }

    decompose() {
        const boundedSplit = this.query.split(this.language === 'en' ? ' in ' : ' au ');
        const radialSplit = this.query.split(this.language === 'en' ? ' near ' : ' près du ');
        const commaSplit = this.query.split(',');
        
        if (boundedSplit.length > 1 && radialSplit.length > 1) {
            throw new Error('Cannot constrain by both radial and bounded locations (in and near).');
        } else if (boundedSplit.length === 2) {
            // send off for process
        } else if (radialSplit.length === 2) {
            // send off for process
        } else if (commaSplit.length > 1) {
            // if true they are all types
            if (commaSplit.every(p => !!this.types.isValid(p))) {
                commaSplit.forEach(t => this.types.validSet.add(t));

            } else if (commaSplit.length === 2) {
                // contraint 2 must be a province, NTS, or FSA (100km radial)
            }
        } else {
            // plain jane name nts/fsa search
        }
    }

    typesInName(q: string): string | false {
        const regx = new RegExp(/.*(\((.+)\))/);
        const regxResult = regx.exec(q);

        if (regxResult) {
            regxResult[2].split(',').map(type => {
                let checkedType = this.types.isValid(type);
                if (checkedType)
                    this.types.validSet.add(checkedType);
            });
            return q.replace(regxResult[1], '');
        }
        return false;
    }

    processQuery(query: string): Q.Query {
        const q = this.categorizeQuery(this.config, query);
        queryHistory[q.query] = queryHistory[q.query] ? queryHistory[q.query] : q.run();
        return queryHistory[query];
    }

    categorizeQuery(config: defs.mainConfig, query: string): {query: string, run: Function} {
        let run: Function;
        // FSA test
        if (this.FSAregex.test(query)) {
            query = query.substring(0,3).toUpperCase();
            run = () => new Q.FSAQuery(config, query);
        // Partial NTS match (Sheet and Map Unit Subdivision)
        } else if (this.NTSregex.test(query)) {
            query = query.substring(0,6).toUpperCase();
            run = () => new Q.NTSQuery(config, query);
        // name based search
        } else {
            run = () => {
                const q = new Q.Query(config, query);
                q.onComplete = q.search().then(results => {
                    q.results = results;
                    return q;
                });
                return q;
            };            
        }

        return {query, run};
    }
}

interface UIconfig {
    handleResults?:     resultHandler,
    handleFeatures?:    featureHandler,
    resultElem?:        HTMLElement,
    featureElem?:       HTMLElement
    inputElem?:         HTMLInputElement
}

interface resultHandler {
    (results: defs.nameResultList): HTMLElement
}

interface featureHandler {
    (results: defs.queryFeatureResults): HTMLElement
}


if ((<any>window)) {
    (<any>window).GeoSearch = GeoSearch;
}