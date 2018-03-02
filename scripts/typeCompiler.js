const fetch = require('node-fetch');
const fs = require('fs');
var pluralize = require('pluralize')

const types = {
    "FSA": "FSA",
    "forward sortation area": "FSA",
    "région de tri d'acheminement": "FSA",
    "NTS": "NTS",
    "national topographic system": "NTS",
    "système national de référence cartographique": "NTS"
};

function fetchConsise(lang) {
    return fetch(`https://geogratis.gc.ca/services/geoname/${lang}/codes/concise.json`).then(res => res.json())
        .then(json => json.definitions.forEach(type => {
            addType(type.code, type.code);
            
            const regx = new RegExp(/.*(\((.+)\))/);
            const regxResult = regx.exec(type.description);
            if (regxResult)
                regxResult[2].split(',').forEach(altName => addType(altName.trim(), type.code, lang === 'en'));
        }));
}

function addType(i, v, makePlural = false) {
    i = i.toLowerCase();
    v = v.toUpperCase();

    if (!types[i])
        types[i] = v;

    if (makePlural)
        addType(pluralize(i), v);
}

Promise.all([fetchConsise('en'), fetchConsise('fr')]).then(() => {
    fs.writeFileSync('data/types.json', JSON.stringify(types));
    return 1;
});