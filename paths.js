const path = require('path');

const rootPath = path.resolve(__dirname);
const srcDir = path.resolve(rootPath, 'src');
const storeDir = path.resolve(rootPath, 'src/store');
const modulesDir = path.resolve(rootPath, 'src/modules');

module.exports = {
  rootPath,
  srcDir,
  storeDir,
  modulesDir
};
