const fetch = require('node-fetch');
const fs = require('fs');
const provinces = {};
const PROV_TO_FSA = {10: 'A', 11: 'C', 12: 'B', 13: 'E', 24: ['G', 'H', 'J'], 35: ['K', 'L', 'M', 'N', 'P'], 46: 'R', 47: 'S', 48: 'T', 59: 'V', 60: 'Y', 61: 'X', 62: 'X'};

function fetchBasicProvinceInfo() {
    return fetch(`https://geogratis.gc.ca/services/geoname/en/codes/province.json`)
        .then(res => res.json())
        .then(json => Promise.all(json.definitions.map(type => {
            type.code = parseInt(type.code);

            return fetch(`http://geogratis.gc.ca/services/geoname/en/geonames.json?province=${type.code}&concise=PROV,TERR`)
                .then(res => res.json())
                .then(results => {
                    if (!results || !results.items || results.items.length === 0)
                        return;
                        
                    provinces[type.code] = {
                        shortForm: type.term,
                        code: type.code,
                        FSA: PROV_TO_FSA[type.code],
                        names: results.items.map(r => r.name),
                        latlon: { lat: results.items[0].latitude, lon: results.items[0].longitude },
                        bbox:  results.items[0].bbox
                    };                   
                });
        })));
}

fetchBasicProvinceInfo().then(() => {
    fs.writeFileSync('data/provinces.json', JSON.stringify({all: provinces}));
    return 1;
});