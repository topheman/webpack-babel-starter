const log = require('npmlog');
log.level = 'silly';

log.info('dependency', 'Some dependencies were installed to test the starter kit');
log.info('dependency', `mocha and chai are ONLY used for those unit tests, if you don't need them, just launch:`);
log.info('dependency', `npm remove mocha chai`);
console.log('');
