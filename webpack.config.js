/**
 * Inspired by https://github.com/topheman/react-es6-redux
 */

const path = require('path');
const log = require('npmlog');
log.level = 'silly';
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const plugins = [];

const root = __dirname;

const MODE_DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') > -1 ? true : false;

log.info('webpack', 'Launched in ' + (MODE_DEV_SERVER ? 'dev-server' : 'build') + ' mode');

/** environment setup */

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
const DEVTOOLS = process.env.DEVTOOLS ? JSON.parse(process.env.DEVTOOLS) : false;// can be useful in case you have web devtools
const SOURCEMAPS = NODE_ENV !== 'production' || DEVTOOLS === true;
const LINTER = process.env.LINTER ? JSON.parse(process.env.LINTER) : true;
const FAIL_ON_ERROR = process.env.FAIL_ON_ERROR ? JSON.parse(process.env.FAIL_ON_ERROR) : !MODE_DEV_SERVER;// disabled on dev-server mode, enabled in build mode
const OPTIMIZE = NODE_ENV === 'production' && DEVTOOLS !== true;
const hash = (NODE_ENV === 'production' && DEVTOOLS ? '-devtools' : '') + (NODE_ENV === 'production' ? '-[hash]' : '');

log.info('webpack', `${NODE_ENV.toUpperCase()} mode`);
if (DEVTOOLS) {
  log.info('webpack', 'DEVTOOLS active');
}
if (SOURCEMAPS) {
  log.info('webpack', 'SOURCEMAPS activated');
}
if (FAIL_ON_ERROR) {
  log.info('webpack', 'NoErrorsPlugin disabled, build will fail on error');
}
if (OPTIMIZE) {
  log.info('webpack', 'OPTIMIZE: code will be compressed and deduped');
}

/** plugins setup */

if(!FAIL_ON_ERROR) {
  plugins.push(new webpack.NoErrorsPlugin());
}

//plugins.push(new HtmlWebpackPlugin({
//  title: 'Topheman - rxjs-experiments',
//  template: 'src/index.ejs', // Load a custom template
//  inject: 'body' // Inject all scripts into the body
//}));
plugins.push(new HtmlWebpackPlugin());
// extract css into one main.css file
plugins.push(new ExtractTextPlugin(`css/main${hash}.css`, {
  disable: false,
  allChunks: true
}));
plugins.push(new webpack.DefinePlugin({
  // Lots of library source code (like React) are based on process.env.NODE_ENV
  // (all development related code is wrapped inside a conditional that can be dropped if equal to "production"
  // this way you get your own react.min.js build)
  'process.env':{
    'NODE_ENV': JSON.stringify(NODE_ENV),
    'DEVTOOLS': DEVTOOLS, // You can rely on this var in your code to enable specific features only related to development (that are not related to NODE_ENV)
    'LINTER': LINTER // You can choose to log a warning in dev if the linter is disabled
  }
}));

if (OPTIMIZE) {
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true
    }
  }));
}

if (MODE_DEV_SERVER) {
  // webpack-dev-server mode
  log.info('webpack', 'Check http://localhost:8080');
}
else {
  // build mode
  log.info('webpackbuild', `rootdir: ${root}`);
}

/** preloaders */

const preLoaders = [];

if (LINTER) {
  log.info('webpack', 'LINTER ENABLED');
  preLoaders.push({
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader'
  });
}
else {
  log.info('webpack', 'LINTER DISABLED');
}

/** webpack config */

const config = {
  bail: FAIL_ON_ERROR,
  entry: {
    'js/bundle': './src/bootstrap.js',
    'css/main': './src/style/main.scss'
  },
  output: {
    publicPath: '',
    filename: `[name]${hash}.js`,
    chunkFilename: `js/[id]${hash}.chunk.js`,
    path: './build/assets'
  },
  cache: true,
  debug: NODE_ENV === 'production' ? false : true,
  devtool: SOURCEMAPS ? 'sourcemap' : false,
  module: {
    preLoaders: preLoaders,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract('style-loader',
          'css-loader?sourceMap!sass-loader?sourceMap=true&sourceMapContents=true&outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
        )
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader'
      },
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  plugins: plugins,
  node:{
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

module.exports = config;
