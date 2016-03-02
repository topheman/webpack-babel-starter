/**
 * Inspired by https://github.com/topheman/react-es6-redux
 */

const path = require('path');
const log = require('npmlog');
log.level = 'silly';
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const myLocalIp = require('my-local-ip');
const common = require('./common');
const plugins = [];

const BANNER = common.getBanner();
const BANNER_HTML = common.getBannerHtml();

const root = __dirname;

const MODE_DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') > -1 ? true : false;

log.info('webpack', 'Launched in ' + (MODE_DEV_SERVER ? 'dev-server' : 'build') + ' mode');

/** environment setup */

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
const BUILD_DIR = process.env.BUILD_DIR || './build';
const DEVTOOLS = process.env.DEVTOOLS ? JSON.parse(process.env.DEVTOOLS) : null;// can be useful in case you have web devtools (null by default to differentiate from true or false)
// optimize in production by default - otherwize, override with OPTIMIZE=false flag (if not optimized, sourcemaps will be generated)
const OPTIMIZE = process.env.OPTIMIZE ? JSON.parse(process.env.OPTIMIZE) : NODE_ENV === 'production';
const LINTER = process.env.LINTER ? JSON.parse(process.env.LINTER) : true;
const FAIL_ON_ERROR = process.env.FAIL_ON_ERROR ? JSON.parse(process.env.FAIL_ON_ERROR) : !MODE_DEV_SERVER;// disabled on dev-server mode, enabled in build mode
const STATS = process.env.STATS ? JSON.parse(process.env.STATS) : false; // to output a stats.json file (from webpack at build - useful for debuging)
const LOCALHOST = process.env.LOCALHOST ? JSON.parse(process.env.LOCALHOST) : true;
const hash = (NODE_ENV === 'production' && DEVTOOLS ? '-devtools' : '') + (NODE_ENV === 'production' ? '-[hash]' : '');

/** integrity checks */

if (/.*(?!\/).$/.test(BUILD_DIR) === false) {
  log.error('webpack', `BUILD_DIR should not contain trailing slashes - you passed "${BUILD_DIR}"`);
  process.exit(1);
}

log.info('webpack', `${NODE_ENV.toUpperCase()} mode`);
if (DEVTOOLS) {
  log.info('webpack', 'DEVTOOLS active');
}
if (!OPTIMIZE) {
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

plugins.push(new HtmlWebpackPlugin({
  title: 'Topheman - Webpack Babel Starter Kit',
  template: 'src/index.ejs', // Load a custom template
  inject: MODE_DEV_SERVER, // inject scripts in dev-server mode - in build mode, use the template tags
  MODE_DEV_SERVER: MODE_DEV_SERVER,
  DEVTOOLS: DEVTOOLS,
  BANNER_HTML: BANNER_HTML
}));
// extract css into one main.css file
plugins.push(new ExtractTextPlugin(`main${hash}.css`, {
  disable: false,
  allChunks: true
}));
plugins.push(new webpack.BannerPlugin(BANNER));
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
  if(LOCALHOST) {
    log.info('webpack', 'Check http://localhost:8080');
  }
  else {
    log.info('webpack', 'Check http://' + myLocalIp() + ':8080');
  }
}
else {
  // build mode
  log.info('webpackbuild', `rootdir: ${root}`);
  if (STATS) {
    //write infos about the build (to retrieve the hash) https://webpack.github.io/docs/long-term-caching.html#get-filenames-from-stats
    plugins.push(function() {
      this.plugin("done", function(stats) {
        require("fs").writeFileSync(
          path.join(__dirname, "build", "stats.json"),
          JSON.stringify(stats.toJson()));
      });
    });
  }
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
    'bundle': './src/bootstrap.js',
    'main': './src/style/main.scss'
  },
  output: {
    publicPath: '',
    filename: `[name]${hash}.js`,
    chunkFilename: `[id]${hash}.chunk.js`,
    path: BUILD_DIR
  },
  cache: true,
  debug: NODE_ENV === 'production' ? false : true,
  devtool: OPTIMIZE ? false : 'sourcemap',
  devServer: {
    host: LOCALHOST ? 'localhost' : myLocalIp()
  },
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
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader',
          'css-loader?sourceMap!sass-loader?sourceMap=true&sourceMapContents=true&outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
        )
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=5000&name=assets/[hash].[ext]' },// @todo fix svg
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=5000&name=assets/[hash].[ext]' }
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
