import * as defs from './definitions';
import * as provs from '../data/provinces.json';

class Province implements ProvinceI {
    term: string;
    en: string;
    code: string;
    FSA: string | Array<string>;
    fr: string;
    latlon: defs.latLon;
    bbox: Array<number>;

    containsFSA(fsa: string): boolean {
        fsa = fsa.substring(0,1);
        return typeof this.FSA === 'string' ? fsa === this.FSA : !!this.FSA.find(f => f === fsa);
    }
}

export const list: Array<ProvinceI> = Object.keys(provs).map(provCode => {
    const P = new Province();
    Object.assign(P, provs[provCode]);
    return P;
});

export interface ProvinceI {
    "term": string,
    "en": string,
    "code": string,
    "FSA": string | Array<string>,
    "fr": string,
    "latlon": defs.latLon,
    "bbox": Array<number>,
    containsFSA(fsa: string): boolean
}