const fs = require('fs');
const path = require('path');

const lessToJS = require('less-vars-to-js');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const withAntd = require('./next-antd.config');
const antdVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8'));
const keys = require('./config/keys')
let radiksServer = 'http://localhost:3000'

if (process.env.HEROKU_APP_NAME) {
  radiksServer =`https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
}

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}

module.exports = withAntd({
  cssModules: true,
  cssLoaderOptions: {
    sourceMap: false,
    importLoaders: 1,
  },
  env: {
    RADIKS_API_SERVER: radiksServer,
    MONGO_URI: keys.mongoURI,
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: antdVariables,
  },
  webpack: config => {
    config.plugins.push(
      new FilterWarningsPlugin({
        // ignore ANTD chunk styles [mini-css-extract-plugin] warning
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      }),
    );

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
})