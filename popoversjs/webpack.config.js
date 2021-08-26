const path = require('path')
const webpack = require('webpack');

const version = 'v0.1.0';
const licenceBanner = `@popovers.js ${version} - MIT License`;

module.exports = {
  entry: {
    popovers: path.resolve(__dirname, './popovers.js'),
    'popovers.bootstrap': path.resolve(__dirname, './popovers.bootstrap.js'),
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: `[name].js`,
  },
  plugins: [
    new webpack.BannerPlugin(licenceBanner),
  ]
};
