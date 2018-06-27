Provides name, postal code, and NTS location based searching within Canada, using GeoGratis as the backend provider.

It can be configured to return only certain types of results like provinces or cities, and can be used in English or French.

## See our [documentation](https://geosearch-docs.fgpv-vpgf.com) for all the details

### Installation

#### Package manager
Using a package manager such as npm or yarn:

```bash
npm i --save github:RAMP-PCAR/geosearch

or

yarn add github:RAMP-PCAR/geosearch
```

Then import or require:

```js
import 'geosearch';
```

#### Precompiled

This repo contains a `dist` folder where you'll find a precomiled library version ready to be included in a `script` tag on your page.

A global window object will be created to access the library.