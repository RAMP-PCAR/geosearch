const fetch = require('node-fetch');
const fs = require('fs');
const provinces = {};
const PROV_TO_FSA = {10: 'A', 11: 'C', 12: 'B', 13: 'E', 24: ['G', 'H', 'J'], 35: ['K', 'L', 'M', 'N', 'P'], 46: 'R', 47: 'S', 48: 'T', 59: 'V', 60: 'Y', 61: 'X', 62: 'X'};

function fetchBasicProvinceInfo() {
    return fetch(`https://geogratis.gc.ca/services/geoname/en/codes/province.json`).then(res => res.json())
        .then(json => json.definitions.forEach(type => {
            type.code = parseInt(type.code);
            if (type.code === 72 || type.code === 73)
                return; // Undersea Features and International Waters are, unfortunatly, not provinces...

            provinces[type.code] = {
                term: type.term,
                en: type.description,
                code: type.code,
                FSA: PROV_TO_FSA[type.code]
            };
        })).then(() => {
            return Promise.all(fetchDetailedInfo());
        });
}

function fetchDetailedInfo() {
    return Object.keys(provinces).map(code => {
        return fetch(`http://geogratis.gc.ca/services/geoname/fr/geonames.json?province=${code}&concise=PROV,TERR`).then(res => res.json())
        .then(json => json.items.forEach(provI => {
            if (json.items.length > 1 && provI.language.code !== 'fra') {
                return;
            }
            provinces[code]['fr'] = provI.name
            provinces[code]['latlon'] = { lat: provI.latitude, lon: provI.longitude };
            provinces[code]['bbox'] = provI.bbox;
        }));
    });
}

fetchBasicProvinceInfo().then(() => {
    fs.writeFileSync('data/provinces.json', JSON.stringify(provinces));
    return 1;
});