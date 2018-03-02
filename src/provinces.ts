import * as provs from '../data/provinces.json';
import { latLon } from './query'; 

export class Province {
    shortForm: string;
    names: Array<string>;
    code: number;
    FSA: string | Array<string> | undefined;
    latlon: latLon;
    bbox: Array<number>;

    containsFSA(fsa: string): boolean {
        if (!this.FSA)
            return false;

        fsa = fsa.substring(0,1);
        return typeof this.FSA === 'string' ? fsa === this.FSA : !!this.FSA.find(f => f === fsa);
    }
}

export const list: Array<Province> = Object.keys(provs).filter(p => !!parseInt(p)).map(provCode => {
    const P = new Province();
    Object.assign(P, provs[provCode]);
    return P;
});

export function search(name: string | number): Province | false {
    return list.find(p => {
        if (typeof name === 'number')
            return p.code === name;
        
        if (name.toUpperCase() === p.shortForm)
            return true;

        if (p.names.find(n => n.toLowerCase() === name.toLowerCase()))
            return true;

        return false;
    }) || false;
}