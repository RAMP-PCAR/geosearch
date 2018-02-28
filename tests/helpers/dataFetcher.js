const provincePromise = require('../../scripts/provinceCompiler.js');
const typesPromise = require('../../scripts/typeCompiler.js');
const fs = require('fs');

beforeAll(async function() {
    this.data_provinces = JSON.parse(fs.readFileSync('data/provinces.json', 'utf8'));
    await provincePromise.then(geoGratisJSON => {
        this.geogratis_provinces = geoGratisJSON;
    });

    this.data_types = JSON.parse(fs.readFileSync('data/types.json', 'utf8'));
    await typesPromise.then(geoGratisJSON => {
        this.geogratis_types = geoGratisJSON;
    });
});