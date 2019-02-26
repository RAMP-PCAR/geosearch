/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./data/fsa_to_prov.json":
/*!*******************************!*\
  !*** ./data/fsa_to_prov.json ***!
  \*******************************/
/*! exports provided: A, B, C, E, G, H, J, K, L, M, N, P, R, S, T, V, X, Y, default */
/***/ (function(module) {

eval("module.exports = {\"A\":10,\"B\":12,\"C\":11,\"E\":13,\"G\":24,\"H\":24,\"J\":24,\"K\":35,\"L\":35,\"M\":35,\"N\":35,\"P\":35,\"R\":46,\"S\":47,\"T\":48,\"V\":59,\"X\":[62,61],\"Y\":60};\n\n//# sourceURL=webpack:///./data/fsa_to_prov.json?");

/***/ }),

/***/ "./data/provinces.json":
/*!*****************************!*\
  !*** ./data/provinces.json ***!
  \*****************************/
/*! exports provided: en, fr, default */
/***/ (function(module) {

eval("module.exports = {\"en\":{\"10\":\"Newfoundland and Labrador\",\"11\":\"Prince Edward Island\",\"12\":\"Nova Scotia\",\"13\":\"New Brunswick\",\"24\":\"Quebec\",\"35\":\"Ontario\",\"46\":\"Manitoba\",\"47\":\"Saskatchewan\",\"48\":\"Alberta\",\"59\":\"British Columbia\",\"60\":\"Yukon\",\"61\":\"Northwest Territories\",\"62\":\"Nunavut\",\"72\":\"Undersea Feature\",\"73\":\"International Waters\"},\"fr\":{\"10\":\"Terre-Neuve-et-Labrador\",\"11\":\"Île-du-Prince-Édouard\",\"12\":\"Nouvelle-Écosse\",\"13\":\"Nouveau-Brunswick\",\"24\":\"Québec\",\"35\":\"Ontario\",\"46\":\"Manitoba\",\"47\":\"Saskatchewan\",\"48\":\"Alberta\",\"59\":\"Colombie-Britannique\",\"60\":\"Yukon\",\"61\":\"Territoires du Nord-Ouest\",\"62\":\"Nunavut\",\"72\":\"Entité sous-marine\",\"73\":\"Eaux internationales\"}};\n\n//# sourceURL=webpack:///./data/provinces.json?");

/***/ }),

/***/ "./data/types.json":
/*!*************************!*\
  !*** ./data/types.json ***!
  \*************************/
/*! exports provided: en, fr, default */
/***/ (function(module) {

eval("module.exports = {\"en\":{\"FSA\":\"Forward Sortation Area\",\"NTS\":\"National Topographic System\",\"COORD\":\"Latitude/Longitude\",\"SCALE\":\"Scale\",\"PROV\":\"Province\",\"TERR\":\"Territory\",\"CITY\":\"City\",\"TOWN\":\"Town\",\"VILG\":\"Village\",\"HAM\":\"Hamlet\",\"UTM\":\"Upper Tier Municipality\",\"LTM\":\"Lower Tier Municipality\",\"STM\":\"Single Tier Municipality\",\"MUN1\":\"Other Municipal-District Area-Major Agglom.\",\"MUN2\":\"Other Municipal-District Area-Miscellaneous\",\"UNP\":\"Unincorporated place\",\"IR\":\"Indian Reserve\",\"GEOG\":\"Geographical Area\",\"PARK\":\"Conservation Area\",\"MIL\":\"Military Area\",\"RIV\":\"River\",\"RIVF\":\"River Feature\",\"FALL\":\"Falls\",\"LAKE\":\"Lake\",\"SPRG\":\"Spring\",\"SEA\":\"Sea\",\"SEAF\":\"Sea Feature\",\"SEAU\":\"Undersea Feature\",\"CHAN\":\"Channel\",\"RAP\":\"Rapids\",\"BAY\":\"Bay\",\"CAPE\":\"Cape\",\"BCH\":\"Beach\",\"SHL\":\"Shoal\",\"ISL\":\"Island\",\"CLF\":\"Cliff\",\"MTN\":\"Mountain\",\"VALL\":\"Valley\",\"PLN\":\"Plain\",\"CAVE\":\"Cave\",\"CRAT\":\"Crater\",\"GLAC\":\"Glacier\",\"FOR\":\"Forest\",\"VEGL\":\"Low Vegetation\",\"MISC\":\"Miscellaneous\",\"RAIL\":\"Railway Feature\",\"ROAD\":\"Road Feature\",\"AIR\":\"Air Navigation Feature\",\"MAR\":\"Marine Navigation Feature\",\"HYDR\":\"Hydraulic Construction\",\"RECR\":\"Recreational Site\",\"RES\":\"Natural Resources Site\",\"CAMP\":\"Miscellaneous Campsite\",\"SITE\":\"Miscellaneous Site\"},\"fr\":{\"FSA\":\"Région De Tri D'Acheminement\",\"NTS\":\"Système National De Référence Cartographique\",\"COORD\":\"Latitude/Longitude\",\"SCALE\":\"Échelle\",\"PROV\":\"Province\",\"TERR\":\"Territoire\",\"CITY\":\"Ville\",\"TOWN\":\"Ville\",\"VILG\":\"Village\",\"HAM\":\"Hameau\",\"UTM\":\"Municipalité de palier supérieure\",\"LTM\":\"Municipalité de palier inférieur\",\"STM\":\"Municipalité de palier simple\",\"MUN1\":\"Autre zone municip.-District-Agglom. majeure\",\"MUN2\":\"Autre zone municipale-District-Divers\",\"UNP\":\"Lieu non organisé\",\"IR\":\"Réserve indienne\",\"GEOG\":\"Zone géographique\",\"PARK\":\"Zone de préservation\",\"MIL\":\"Réserve militaire\",\"RIV\":\"Cours d'eau\",\"RIVF\":\"Entité fluviale\",\"FALL\":\"Chute\",\"LAKE\":\"Lac\",\"SPRG\":\"Source\",\"SEA\":\"Mer\",\"SEAF\":\"Entité maritime\",\"SEAU\":\"Entité sous-marine\",\"CHAN\":\"Chenal\",\"RAP\":\"Rapide\",\"BAY\":\"Baie\",\"CAPE\":\"Cap\",\"BCH\":\"Plage\",\"SHL\":\"Haut-fond\",\"ISL\":\"Île\",\"CLF\":\"Escarpement\",\"MTN\":\"Montagne\",\"VALL\":\"Vallée\",\"PLN\":\"Plaine\",\"CAVE\":\"Caverne\",\"CRAT\":\"Cratère\",\"GLAC\":\"Glacier\",\"FOR\":\"Forêt\",\"VEGL\":\"Végétation basse\",\"MISC\":\"Divers\",\"RAIL\":\"Entité ferroviaire\",\"ROAD\":\"Entité routière\",\"AIR\":\"Entité de navigation aérienne\",\"MAR\":\"Entité de navigation maritime\",\"HYDR\":\"Construction hydraulique\",\"RECR\":\"Site récréationnel\",\"RES\":\"Site de ressources naturelles\",\"CAMP\":\"Camp-Divers\",\"SITE\":\"Site-Divers\"}};\n\n//# sourceURL=webpack:///./data/types.json?");

/***/ }),

/***/ "./src/definitions.ts":
/*!****************************!*\
  !*** ./src/definitions.ts ***!
  \****************************/
/*! exports provided: isFSAResult, isNTSResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isFSAResult\", function() { return isFSAResult; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isNTSResult\", function() { return isNTSResult; });\nfunction isFSAResult(result) {\r\n    return !!result.fsa;\r\n}\r\nfunction isNTSResult(result) {\r\n    return !!result.nts;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/definitions.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: GeoSearch, Q, Provinces, Types, Defs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GeoSearch\", function() { return GeoSearch; });\n/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query */ \"./src/query.ts\");\n/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, \"Q\", function() { return _query__WEBPACK_IMPORTED_MODULE_0__; });\n/* harmony import */ var _provinces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./provinces */ \"./src/provinces.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Provinces\", function() { return _provinces__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ \"./src/types.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Types\", function() { return _types__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./definitions */ \"./src/definitions.ts\");\n/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, \"Defs\", function() { return _definitions__WEBPACK_IMPORTED_MODULE_3__; });\n\r\n\r\n\r\n\r\nvar GEO_LOCATE_URL = 'https://geogratis.gc.ca/services/geolocation/@{language}/locate';\r\nvar GEO_NAMES_URL = 'https://geogratis.gc.ca/services/geoname/@{language}/geonames.json';\r\nvar lastQuery;\r\nvar GeoSearch = /** @class */ (function () {\r\n    function GeoSearch(uConfig) {\r\n        uConfig = uConfig ? uConfig : {};\r\n        var language = uConfig.language ? uConfig.language : 'en';\r\n        // set default URLS if none provided and search/replace language in string (if exists)\r\n        var geoLocateUrl = uConfig.geoLocateUrl ? uConfig.geoLocateUrl : GEO_LOCATE_URL;\r\n        var geoNameUrl = uConfig.geoNameUrl ? uConfig.geoNameUrl : GEO_NAMES_URL;\r\n        geoLocateUrl = geoLocateUrl.replace('@{language}', language);\r\n        geoNameUrl = geoNameUrl.replace('@{language}', language);\r\n        this.config = {\r\n            language: language,\r\n            types: Object(_types__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(language),\r\n            provinces: Object(_provinces__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(language),\r\n            maxResults: uConfig.maxResults ? uConfig.maxResults : 100,\r\n            geoNameUrl: geoNameUrl,\r\n            geoLocateUrl: geoLocateUrl\r\n        };\r\n        this.config.types.filterValidTypes(uConfig.excludeTypes);\r\n    }\r\n    GeoSearch.prototype.ui = function (resultHandler, featureHandler, input, resultContainer, featureContainer) {\r\n        // bind scope of provided iterator to this class, or set to internal resultIterator implementation for default behaviour\r\n        this.resultHandler = resultHandler ? resultHandler.bind(this) : this.defaultResultHandler;\r\n        this.featureHandler = featureHandler ? featureHandler.bind(this) : this.defaultFeatureHandler;\r\n        this.docFrag = document.createDocumentFragment();\r\n        if (!input) {\r\n            input = document.createElement('input');\r\n            this.docFrag.appendChild(input);\r\n        }\r\n        input.onkeyup = this.inputChanged.bind(this);\r\n        if (!featureContainer) {\r\n            this.featureContainer = document.createElement('div');\r\n            this.docFrag.appendChild(this.featureContainer);\r\n        }\r\n        else {\r\n            this.featureContainer = featureContainer;\r\n        }\r\n        if (!resultContainer) {\r\n            this.resultContainer = document.createElement('div');\r\n            this.docFrag.appendChild(this.resultContainer);\r\n        }\r\n        else {\r\n            this.resultContainer = resultContainer;\r\n        }\r\n        this.resultContainer.classList.add('geosearch-ui');\r\n        this.featureContainer.classList.add('geosearch-ui');\r\n        return this;\r\n    };\r\n    GeoSearch.prototype.defaultResultHandler = function (results) {\r\n        var ul = document.createElement('ul');\r\n        results.reverse().forEach(function (r) {\r\n            var li = document.createElement('li');\r\n            li.innerHTML = r.name + \" (\" + r.type + \")\" + (r.location ? ', ' + r.location : '') + \", \" + r.province + \" @ lat: \" + r.LatLon.lat + \", lon: \" + r.LatLon.lon;\r\n            ul.appendChild(li);\r\n        });\r\n        return ul;\r\n    };\r\n    GeoSearch.prototype.defaultFeatureHandler = function (fR) {\r\n        var output;\r\n        if (_definitions__WEBPACK_IMPORTED_MODULE_3__[\"isFSAResult\"](fR)) {\r\n            output = fR.fsa + \" - FSA located in \" + fR.province + \" @ lat: \" + fR.LatLon.lat + \", lon: \" + fR.LatLon.lon;\r\n        }\r\n        else if (_definitions__WEBPACK_IMPORTED_MODULE_3__[\"isNTSResult\"](fR)) {\r\n            output = fR.nts + \" - NTS located in \" + fR.location + \" @ lat: \" + fR.LatLon.lat + \", lon: \" + fR.LatLon.lon;\r\n        }\r\n        else {\r\n            output = \"lat: \" + fR.LatLon.lat + \", lon: \" + fR.LatLon.lon;\r\n        }\r\n        var p = document.createElement('p');\r\n        p.innerHTML = output;\r\n        return p;\r\n    };\r\n    GeoSearch.prototype.inputChanged = function (evt) {\r\n        var _this = this;\r\n        var qValue = evt.target.value;\r\n        if (qValue.length > 2 && qValue !== lastQuery) {\r\n            lastQuery = qValue;\r\n            while (this.resultContainer.firstChild) {\r\n                this.resultContainer.removeChild(this.resultContainer.firstChild);\r\n            }\r\n            while (this.featureContainer.firstChild) {\r\n                this.featureContainer.removeChild(this.featureContainer.firstChild);\r\n            }\r\n            this.query(qValue).onComplete.then(function (q) {\r\n                if (q.featureResults) {\r\n                    _this.featureContainer.appendChild(_this.featureHandler(q.featureResults));\r\n                }\r\n                _this.resultContainer.appendChild(_this.resultHandler(q.results));\r\n            }).catch(function (err) {\r\n                var p = document.createElement('p');\r\n                p.innerHTML = err;\r\n                _this.resultContainer.appendChild(p);\r\n            });\r\n        }\r\n    };\r\n    Object.defineProperty(GeoSearch.prototype, \"htmlElem\", {\r\n        get: function () {\r\n            return this.docFrag;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    GeoSearch.prototype.query = function (query) {\r\n        return _query__WEBPACK_IMPORTED_MODULE_0__[\"make\"](this.config, query);\r\n    };\r\n    return GeoSearch;\r\n}());\r\n\r\n\r\nif (window) {\r\n    window.GeoSearch = GeoSearch;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/provinces.ts":
/*!**************************!*\
  !*** ./src/provinces.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_provinces_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/provinces.json */ \"./data/provinces.json\");\nvar _data_provinces_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../data/provinces.json */ \"./data/provinces.json\", 1);\n/* harmony import */ var _data_fsa_to_prov_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/fsa_to_prov.json */ \"./data/fsa_to_prov.json\");\nvar _data_fsa_to_prov_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../data/fsa_to_prov.json */ \"./data/fsa_to_prov.json\", 1);\n\r\n\r\nvar provinceObj = {};\r\nvar fsaToProv = _data_fsa_to_prov_json__WEBPACK_IMPORTED_MODULE_1__;\r\nvar provs = _data_provinces_json__WEBPACK_IMPORTED_MODULE_0__;\r\nvar Provinces = /** @class */ (function () {\r\n    function Provinces(language) {\r\n        var _this = this;\r\n        this.list = {};\r\n        Object.keys(provs[language]).forEach(function (provKey) {\r\n            _this.list[provKey] = provs[language][provKey];\r\n        });\r\n    }\r\n    Provinces.prototype.fsaToProvinces = function (fsa) {\r\n        var _this = this;\r\n        var genericObj = {};\r\n        // either a provincial code, or an array of them\r\n        var provCodes = fsaToProv[fsa.substring(0, 1).toUpperCase()];\r\n        if (typeof provCodes === 'number') {\r\n            provCodes = [provCodes];\r\n        }\r\n        provCodes.forEach(function (n) {\r\n            genericObj[n] = _this.list[n];\r\n        });\r\n        return genericObj;\r\n    };\r\n    return Provinces;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (language) {\r\n    return provinceObj[language] = provinceObj[language] ? provinceObj[language] : new Provinces(language);\r\n});\r\n\n\n//# sourceURL=webpack:///./src/provinces.ts?");

/***/ }),

/***/ "./src/query.ts":
/*!**********************!*\
  !*** ./src/query.ts ***!
  \**********************/
/*! exports provided: make, Query, NTSQuery, FSAQuery, LatLongQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"make\", function() { return make; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Query\", function() { return Query; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NTSQuery\", function() { return NTSQuery; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FSAQuery\", function() { return FSAQuery; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LatLongQuery\", function() { return LatLongQuery; });\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = Object.setPrototypeOf ||\r\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nfunction make(config, query) {\r\n    var latLngRegDD = /^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?)(\\s*[,|;\\s]\\s*)[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)[*]$/;\r\n    var latLngRegDMS = /^[-+]?([0-8]?\\d|90)\\s*([0-5]?\\d)\\s*([0-5]?\\d)\\s*[,|;\\s]\\s*[-+]?(\\d{2}|1[0-7]\\d|180)\\s*([0-5]?\\d)\\s*([0-5]?\\d)[*]$/;\r\n    var fsaReg = /^[ABCEGHJKLMNPRSTVXY]\\d[A-Z]/;\r\n    var ntsReg = /^\\d{2,3}[A-P]/;\r\n    var scaleReg = /^[1][:]\\d{1,3}[ ]*\\d{1,3}[ ]*\\d{1,3}[*]$/; // from 1:100 to 1:100 000 000\r\n    if (fsaReg.test(query)) {\r\n        // FSA test\r\n        return new FSAQuery(config, query);\r\n    }\r\n    else if (ntsReg.test(query)) {\r\n        // Partial NTS match (Sheet and Map Unit Subdivision)\r\n        query = query.substring(0, 6).toUpperCase();\r\n        return new NTSQuery(config, query);\r\n    }\r\n    else if (latLngRegDD.test(query)) {\r\n        // Lat/Long Decimal Degrees test\r\n        return new LatLongQuery(config, query.slice(0, -1), 'dd');\r\n    }\r\n    else if (latLngRegDMS.test(query)) {\r\n        // Lat/Long Degree Minute Second test\r\n        return new LatLongQuery(config, query.slice(0, -1), 'dms');\r\n    }\r\n    else if (/^[A-Za-z]/.test(query)) {\r\n        // name based search\r\n        var q_1 = new Query(config, query);\r\n        q_1.onComplete = q_1.search().then(function (results) {\r\n            q_1.results = results;\r\n            return q_1;\r\n        });\r\n        return q_1;\r\n    }\r\n    else if (scaleReg.test(query)) {\r\n        // scale search\r\n        var q_2 = new Query(config, query);\r\n        q_2.onComplete = q_2.search().then(function (results) {\r\n            var code = 'SCALE';\r\n            q_2.scale = [{ name: query.slice(0, -1), type: { name: q_2.config.types.validTypes[code], code: \"SCALE\" } }];\r\n            return q_2;\r\n        });\r\n        console.log(q_2);\r\n        return q_2;\r\n    }\r\n    else {\r\n        // possible street address search (not supported) or contains special characters\r\n        var q_3 = new Query(config, query);\r\n        q_3.onComplete = new Promise(function (resolve, reject) { return resolve(q_3); });\r\n        return q_3;\r\n    }\r\n}\r\nvar Query = /** @class */ (function () {\r\n    function Query(config, query) {\r\n        this.suggestions = [];\r\n        this.results = [];\r\n        this.query = query;\r\n        this.config = config;\r\n    }\r\n    Query.prototype.getUrl = function (useLocate, restrict, altQuery, lat, lon) {\r\n        var url = '';\r\n        var query = altQuery ? altQuery : this.query;\r\n        if (useLocate) {\r\n            url = this.config.geoLocateUrl + '?q=' + query;\r\n        }\r\n        else if (lat && lon) {\r\n            url = this.config.geoNameUrl + \"?lat=\" + lat + \"&lon=\" + lon + \"&num=\" + this.config.maxResults;\r\n        }\r\n        else {\r\n            url = this.config.geoNameUrl + \"?q=\" + query + \"&num=\" + this.config.maxResults;\r\n        }\r\n        if (restrict) {\r\n            if (restrict.length === 4) {\r\n                url += \"&bbox=\" + restrict.join(',');\r\n            }\r\n            else {\r\n                url += \"&province=\" + restrict.join(',');\r\n            }\r\n        }\r\n        return url;\r\n    };\r\n    Query.prototype.normalizeNameItems = function (items) {\r\n        var _this = this;\r\n        return items.filter(function (i) { return _this.config.types.validTypes[i.concise.code]; }).map(function (i) {\r\n            return {\r\n                name: i.name,\r\n                location: i.location,\r\n                province: _this.config.provinces.list[i.province.code],\r\n                type: _this.config.types.allTypes[i.concise.code],\r\n                LatLon: { lat: i.latitude, lon: i.longitude },\r\n                bbox: i.bbox\r\n            };\r\n        });\r\n    };\r\n    Query.prototype.search = function (restrict) {\r\n        var _this = this;\r\n        return this.jsonRequest(this.getUrl(false, restrict)).then(function (r) { return _this.normalizeNameItems(r.items); });\r\n    };\r\n    Query.prototype.nameByLatLon = function (lat, lon, restrict) {\r\n        var _this = this;\r\n        return this.jsonRequest(this.getUrl(false, restrict, undefined, lat, lon)).then(function (r) {\r\n            return _this.normalizeNameItems(r.items);\r\n        });\r\n    };\r\n    Query.prototype.locateByQuery = function (altQuery) {\r\n        return this.jsonRequest(this.getUrl(true, undefined, altQuery));\r\n    };\r\n    Query.prototype.jsonRequest = function (url) {\r\n        return new Promise(function (resolve, reject) {\r\n            var xobj = new XMLHttpRequest();\r\n            xobj.open('GET', url, true);\r\n            xobj.responseType = 'json';\r\n            xobj.onload = function () {\r\n                if (xobj.status === 200) {\r\n                    resolve(typeof xobj.response === 'string' ? JSON.parse(xobj.response) : xobj.response);\r\n                }\r\n                else {\r\n                    reject('Could not load results from remote service.');\r\n                }\r\n            };\r\n            xobj.send();\r\n        });\r\n    };\r\n    return Query;\r\n}());\r\n\r\n/**\r\n * National Topographic System (NTS)\r\n *\r\n * The following definitions have the form \"name (value constraints) - description\"\r\n *\r\n * Sheet (two or three digits)      - aka \"Map Numbers\" are blocks of approximately 4,915,200 hectares.\r\n * Map Units Subdivision ([A-P])    - each sheet is subdivided further into 16 blocks, approximately 307,200 hectares\r\n * Map Sheet Unit ([1-16])          - each map unit is subdivided further into 16 blocks, approximately 19,200 hectares\r\n * Blocks ([A-L])                   - each map sheet unit is subdivided further into 12 blocks, approximately 1600 hectares\r\n * Units ([1-100]*)                 - each block is finally divided into 100 units, approximately 64 hectares\r\n *\r\n * Two subsets of the complete NTS format is supported:\r\n *     - Sheet and Map Unit Subdivision\r\n *     - Sheet, Map Unit Subdivision, and Map Sheet Unit\r\n *\r\n * Note that \"Blocks\" and \"Units\" are currently not supported on geogratis and are ignored on the query.\r\n */\r\nvar NTSQuery = /** @class */ (function (_super) {\r\n    __extends(NTSQuery, _super);\r\n    function NTSQuery(config, query) {\r\n        var _this = this;\r\n        // front pad 0 if NTS starts with two digits\r\n        query = !parseInt(query[2]) ? '0' + query : query;\r\n        _this = _super.call(this, config, query) || this;\r\n        _this.unitName = query;\r\n        _this.onComplete = new Promise(function (resolve, reject) {\r\n            _this.locateByQuery().then(function (lr) {\r\n                // query check added since it can be null but will never be in this case (make TS happy)\r\n                if (lr.length > 0 && _this.query) {\r\n                    var allSheets = _this.locateToResult(lr);\r\n                    _this.unit = allSheets.splice(allSheets.findIndex(function (x) { return x.nts === _this.query; }), 1)[0];\r\n                    _this.mapSheets = allSheets;\r\n                    _this.featureResults = _this.unit;\r\n                    _this.nameByLatLon(_this.unit.LatLon.lat, _this.unit.LatLon.lon).then(function (r) {\r\n                        _this.results = r;\r\n                        resolve(_this);\r\n                    });\r\n                }\r\n                else {\r\n                    reject('Not found');\r\n                }\r\n            });\r\n        });\r\n        return _this;\r\n    }\r\n    NTSQuery.prototype.locateToResult = function (lrl) {\r\n        var _this = this;\r\n        var results = lrl.map(function (ls) {\r\n            var title = ls.title.split(' ');\r\n            return {\r\n                nts: title.shift() || '',\r\n                location: title.join(' '),\r\n                code: 'NTS',\r\n                desc: _this.config.types.allTypes.NTS,\r\n                LatLon: { lat: ls.geometry.coordinates[1], lon: ls.geometry.coordinates[0] },\r\n                bbox: ls.bbox\r\n            };\r\n        });\r\n        return results;\r\n    };\r\n    NTSQuery.prototype.equals = function (otherQ) {\r\n        return this.unitName === otherQ.unitName;\r\n    };\r\n    return NTSQuery;\r\n}(Query));\r\n\r\nvar FSAQuery = /** @class */ (function (_super) {\r\n    __extends(FSAQuery, _super);\r\n    function FSAQuery(config, query) {\r\n        var _this = this;\r\n        query = query.substring(0, 3).toUpperCase();\r\n        _this = _super.call(this, config, query) || this;\r\n        _this.onComplete = new Promise(function (resolve, reject) {\r\n            _this.formatLocationResult().then(function (fLR) {\r\n                if (fLR) {\r\n                    _this.featureResults = fLR;\r\n                    _this.nameByLatLon(fLR.LatLon.lat, fLR.LatLon.lon, Object.keys(fLR._provinces).map(function (x) { return parseInt(x); })).then(function (r) {\r\n                        _this.results = r;\r\n                        resolve(_this);\r\n                    });\r\n                }\r\n                else {\r\n                    reject('FSA code given cannot be found.');\r\n                }\r\n            });\r\n        });\r\n        return _this;\r\n    }\r\n    FSAQuery.prototype.formatLocationResult = function () {\r\n        var _this = this;\r\n        return this.locateByQuery().then(function (locateResponseList) {\r\n            // query check added since it can be null but will never be in this case (make TS happy)\r\n            if (locateResponseList.length === 1 && _this.query) {\r\n                var provList_1 = _this.config.provinces.fsaToProvinces(_this.query);\r\n                return {\r\n                    fsa: _this.query,\r\n                    code: 'FSA',\r\n                    desc: _this.config.types.allTypes.FSA,\r\n                    province: Object.keys(provList_1).map(function (i) { return provList_1[i]; }).join(','),\r\n                    _provinces: provList_1,\r\n                    LatLon: { lat: locateResponseList[0].geometry.coordinates[1], lon: locateResponseList[0].geometry.coordinates[0] }\r\n                };\r\n            }\r\n        });\r\n    };\r\n    return FSAQuery;\r\n}(Query));\r\n\r\nvar LatLongQuery = /** @class */ (function (_super) {\r\n    __extends(LatLongQuery, _super);\r\n    function LatLongQuery(config, query, type) {\r\n        var _this = _super.call(this, config, query) || this;\r\n        var coords;\r\n        // remove extra spaces and delimiters (the filter). convert string numbers to floaty numbers\r\n        var filteredQuery = query.split(/[\\s|,|;|]/).filter(function (n) { return !isNaN(n) && n !== ''; }).map(function (n) { return parseFloat(n); });\r\n        if (type === 'dms') {\r\n            // if degree, minute, second, convert to decimal degree\r\n            var latdd = Math.abs(filteredQuery[0]) + filteredQuery[1] / 60 + filteredQuery[2] / 3600; // unsigned\r\n            var longdd = Math.abs(filteredQuery[3]) + filteredQuery[4] / 60 + filteredQuery[5] / 3600; // unsigned\r\n            // check if we need to reset sign\r\n            latdd = (filteredQuery[0] > 0) ? latdd : latdd * -1;\r\n            longdd = (filteredQuery[3] > 0) ? longdd : longdd * -1;\r\n            coords = [latdd, longdd];\r\n        }\r\n        else {\r\n            coords = filteredQuery;\r\n        }\r\n        // apply buffer to create bbox from point coordinates\r\n        var buff = 0.015; //degrees\r\n        var boundingBox = [coords[1] - buff, coords[0] - buff, coords[1] + buff, coords[0] + buff];\r\n        // prep the lat/long result that needs to be generated along with name based results\r\n        _this.latLongResult = {\r\n            name: coords[0] + \",\" + coords[1],\r\n            location: {\r\n                latitude: coords[0],\r\n                longitude: coords[1]\r\n            },\r\n            type: { name: 'Latitude/Longitude', code: 'COORD' },\r\n            position: [coords[0], coords[1]],\r\n            bbox: boundingBox\r\n        };\r\n        _this.onComplete = new Promise(function (resolve, reject) {\r\n            //this.getLatLonResults(query, coords[0], coords[1]).then((r: any) => {\r\n            _this.nameByLatLon(coords[0], coords[1]).then(function (r) {\r\n                _this.results = r;\r\n                resolve(_this);\r\n            });\r\n        });\r\n        return _this;\r\n    }\r\n    return LatLongQuery;\r\n}(Query));\r\n\r\n\n\n//# sourceURL=webpack:///./src/query.ts?");

/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_types_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/types.json */ \"./data/types.json\");\nvar _data_types_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../data/types.json */ \"./data/types.json\", 1);\n\r\nvar typeObj = {};\r\nvar types = _data_types_json__WEBPACK_IMPORTED_MODULE_0__;\r\nvar Types = /** @class */ (function () {\r\n    function Types(language) {\r\n        var _this = this;\r\n        this.allTypes = {};\r\n        this.validTypes = {};\r\n        this.filterComplete = false;\r\n        Object.keys(types[language]).forEach(function (typeKey) {\r\n            _this.allTypes[typeKey] = types[language][typeKey];\r\n            _this.validTypes[typeKey] = types[language][typeKey];\r\n        });\r\n    }\r\n    Types.prototype.filterValidTypes = function (exclude) {\r\n        if (this.filterComplete) {\r\n            return this.validTypes;\r\n        }\r\n        exclude = typeof exclude === 'string' ? [exclude] : exclude;\r\n        if (exclude && exclude.length > 0) {\r\n            for (var _i = 0, exclude_1 = exclude; _i < exclude_1.length; _i++) {\r\n                var key = exclude_1[_i];\r\n                delete this.validTypes[key];\r\n            }\r\n        }\r\n        this.filterComplete = true;\r\n        return this.validTypes;\r\n    };\r\n    return Types;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (language) {\r\n    return typeObj[language] = typeObj[language] ? typeObj[language] : new Types(language);\r\n});\r\n\n\n//# sourceURL=webpack:///./src/types.ts?");

/***/ })

/******/ });