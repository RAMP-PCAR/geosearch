#!/bin/bash

mv ./src/geosearch.js ./docs/geosearch.js
mv ./docs "./$TRAVIS_TAG"

rsync -e 'ssh -i /tmp/docs_rsa' -r --delete-after --quiet "./$TRAVIS_TAG" milesap@fgpv-vpgf.com:/home/milesap/rootwww/geosearch-docs