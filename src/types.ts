import * as types from '../data/types.json';
import * as defs from './definitions';

class Type implements TypeI {
    // The key values are valid geoname concise types with an array value of all permutations
    conciseToList = {};
    filteredConciseToList = {};
    flat = types;
    filteredFlat = types;
    validSet = new Set();

    constructor() {
        Object.keys(types).forEach(p => {
            if (!this.conciseToList[types[p]])
                this.conciseToList[types[p]] = [];
            
            this.conciseToList[types[p]].push(p);
        });

        Object.assign(this.filteredConciseToList, this.conciseToList);
    }

    isValid(type: string): string | false {
        type = type.trim();
        if (this.filteredConciseToList[type.toUpperCase()])
            return type.toUpperCase();
        else if (this.filteredFlat[type.toLowerCase()])
            return this.filteredFlat[type.toLowerCase()];
        else
            return false;
    }

    filterValidTypes(include?: string | Array<string>, exclude?: string | Array<string>): defs.genericObjectType {
        include = typeof include === 'string' ? [include] : include;
        exclude = typeof exclude === 'string' ? [exclude] : exclude;
        const setExclusion = include || exclude ? (include && include.length > 0) || (exclude && exclude.length) : null;
    
        if (setExclusion !== null) {
            const typeSet = new Set(Object.keys(this.filteredConciseToList));
            const keySet = new Set(include || exclude);
            const invalidKeys = new Set([...typeSet].filter(x => !setExclusion === keySet.has(x)));
            for (let key of invalidKeys) {
                this.filteredConciseToList[key].forEach(altName => {
                    delete this.filteredFlat[altName];
                });
                delete this.filteredConciseToList[key];
            }
        }

        return this.filteredConciseToList;
    }
}

export function make() {
    return new Type();
}

export interface TypeI {
    conciseToList: {[key: string]: Array<string>};
    filteredConciseToList: {[key: string]: Array<string>};
    filteredFlat: defs.genericObjectType;
    flat: defs.genericObjectType;
    validSet: Set<string>;
    filterValidTypes(include?: string | Array<string>, exclude?: string | Array<string>): defs.genericObjectType;
    isValid(type: string): string | false;
}