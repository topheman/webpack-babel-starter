#!/usr/bin/env bash
node ./contributing/bin/warning-message.js
echo 'Launching tests suite'
echo ''

# vars retrieving the exit codes of the commands run
NPM_RUN_BUILD_EXIT_CODE=0
NPM_RUN_BUILD_PROD_EXIT_CODE=0
NPM_RUN_BUILD_PROD_ALL_EXIT_CODE=0

echo 'Running npm run build before launching tests'
STATS=true npm run build
./node_modules/.bin/mocha -r chai 'contributing/tests/run-build.spec.js'
NPM_RUN_BUILD_EXIT_CODE=$?

echo 'Running npm run build-prod before launching tests'
STATS=true npm run build-prod
./node_modules/.bin/mocha -r chai 'contributing/tests/run-build-prod.spec.js'
NPM_RUN_BUILD_PROD_EXIT_CODE=$?

echo 'Running npm run build-prod-all before launching tests'
npm run build-prod-all
./node_modules/.bin/mocha -r chai 'contributing/tests/run-build-prod-all.spec.js'
NPM_RUN_BUILD_PROD_ALL_EXIT_CODE=$?

if [ $NPM_RUN_BUILD_EXIT_CODE -gt 0 ] || [ $NPM_RUN_BUILD_PROD_EXIT_CODE -gt 0 ] || [ $NPM_RUN_BUILD_PROD_ALL_EXIT_CODE -gt 0 ]
then
  echo "TEST FAILED!!!"
  exit 1
fi

echo "TEST PASSED"
exit 0
