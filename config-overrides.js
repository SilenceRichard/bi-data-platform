const { override, fixBabelImports } = require('customize-cra');
const Promise = require('es6-promise-promise');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
);