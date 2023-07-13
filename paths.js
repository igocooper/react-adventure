const path = require('path');

const rootPath = path.resolve(__dirname);
const srcDir = path.resolve(rootPath, 'src');
const storeDir = path.resolve(rootPath, 'src/store');
const modulesDir = path.resolve(rootPath, 'src/modules');
const commonDir = path.resolve(rootPath, 'src/common');
const configDir = path.resolve(rootPath, 'src/config');
const factoryDir = path.resolve(rootPath, 'src/factory');
const themeDir = path.resolve(rootPath, 'src/theme');

module.exports = {
  rootPath,
  srcDir,
  storeDir,
  modulesDir,
  commonDir,
  configDir,
  factoryDir,
  themeDir
};
