#!/usr/bin/env bash
# This will install the dev dependencies for unit tests (doing so, so that they won't pollute the package.json of the user)
node ./contributing/bin/warning-message.js
echo 'Installing dependencies for unit-tests'
echo 'You will then be able to launch the test via "npm run contributing-test"'
echo ''
npm install mocha
npm install chai
