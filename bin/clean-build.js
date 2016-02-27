const log = require('npmlog');
log.level = 'silly';
const common = require('../common');

const ROOT_DIR = common.getRootDir();

/** run */

log.info('clean-build', `Cleaning ...`);
const deleted = require('del').sync([
  ROOT_DIR + '/build/*',
  ROOT_DIR + '/build/**/*',
  ROOT_DIR + '/build/!.git/**/*'
]);
deleted.forEach(function(e){
  console.log(e);
});
