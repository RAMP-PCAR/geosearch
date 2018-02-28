import * as Provinces from './provinces';
import * as Types from './types';

export interface genericObjectType {
    [key: string]: string
}

export interface genericNumberObjectType {
    [key: string]: number
}

// config object is used by all query classes
export interface mainConfig {
    geoNameUrl: string,
    geoLocateUrl: string,
    language: string,
    types: Types.TypeI,
    provinces: Provinces.ProvinceI,
    sortByTypes: genericNumberObjectType
}

export interface userConfig {
    includeTypes?: string | Array<string>,
    excludeTypes?: string | Array<string>,
    language?: string,
    geoLocateUrl?: string,
    geoNameUrl?: string,
    sortByTypes?: Array<string>
}

export interface latLon {
    lat: number,
    lon: number
}

export interface locateResponse {
    title: string,
    bbox?: Array<number>,
    geometry: { coordinates: Array<number> }
}

export interface nameResponse {
    name: string,
    location: string,
    province: {code: string},
    concise: { code: string },
    latitude: number,
    longitude: number,
    bbox: Array<number>,
}

// final results from a query, filtered on types and sorted where applicable
export interface finalResults {
    featured: nameResultList | FSAResult | NTSResult,
    results: nameResultList
}

export interface rawNameResult {
    items: Array<nameResponse>
}

// defines results from a geoNames search
export interface nameResult {
    name: string,
    location: string,
    province: {
        name: string,
        code: string
    },
    type: string,
    latLon: latLon,
    bbox: Array<number>
}

export interface NTSResult {
    nts: string, // 064D or 064D06
    location: string, // "NUMABIN BAY"
    code: string, // "NTS"
    desc: string, // "National Topographic System"
    latLon: latLon,
    bbox: Array<number>
}


export type nameResultList = Array<nameResult>
export type NTSResultList = Array<NTSResult>;
export type queryFeatureResults = FSAResult | NTSResult;

export function isFSAResult(result: queryFeatureResults): result is FSAResult {
    return !!(<FSAResult>result).fsa;
}

export function isNTSResult(result: queryFeatureResults): result is NTSResult {
    return !!(<NTSResult>result).nts;
}

