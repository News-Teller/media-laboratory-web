/* config-overrides.js */
const { override, addBabelPlugin } = require('customize-cra')

module.exports = override(
  // See https://material-ui.com/guides/minimizing-bundle-size
  addBabelPlugin([
    'import',
    {
      libraryName: '@material-ui/core',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'core',
  ]),
  addBabelPlugin([
    'import',
    {
      libraryName: '@material-ui/icons',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'icons',
  ]),
);
