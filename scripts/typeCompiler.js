const fetch = require('node-fetch');
const fs = require('fs');
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
            if (!types[type.code])
                types[type.code] = types[type.code];

            const regx = new RegExp(/.*(\((.+)\))/);
            const regxResult = regx.exec(type.description);
            if (regxResult) {
                regxResult[2].split(',').map(altName => {
                    altName = altName.trim();
                    if (!types[altName])
                        types[altName] = type.code;
                });
            }
        }));
}

Promise.all([fetchConsise('en'), fetchConsise('fr')]).then(() => {
    fs.writeFileSync('data/types.json', JSON.stringify(types));
    return 1;
});