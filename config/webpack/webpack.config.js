/* eslint-disable indent, import/no-dynamic-require */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HappyPack = require('happypack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const paths = require('../paths');

const isDebug = process.env.NODE_ENV === 'development';

const publicPath = isDebug ? 'http://localhost:3001/' : paths.servedPath;
const context = path.join(process.cwd());
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
const cssFilename = 'static/css/[name].[contenthash:8].css';
const loadableChunkFilename = path.join(paths.appBuild, 'loadable-chunks.json');
const shouldUseRelativeAssetPaths = publicPath === './';
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to build folder.
    { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};

// Use a common function to handle css|less|scss loaders
function getStyleLoader(id) {
  if (!id) {
    throw new Error('id cannot be null or undefined');
  }

  const styleLoaders = [
    {
      loader: require.resolve('css-loader'),
      options: {
        minimize: true,
        // Enable css module
        modules: true,
        localIdentName: '[path]__[name]__[local]___[hash:base64:5]',
        importLoaders: id === 'css' ? 1 : 2,
        sourceMap: true,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: true,
      },
    },
  ];

  if (id !== 'css') {
    styleLoaders.push({
      loader: `${id}-loader`,
      options: {
        outputStyle: 'expanded',
        sourceMapContents: true,
        sourceMap: true,
      },
    });
  }

  return styleLoaders;
}

module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: !isDebug,
  cache: isDebug,
  context,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: isDebug ? 'cheap-module-source-map' : 'source-map',
  output: {
    // The build folder.
    path: paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: isDebug,
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: isDebug
      ? 'static/js/[name].js'
      : 'static/js/[name].[chunkhash:8].js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: isDebug
      ? 'static/js/[name].chunk.js'
      : 'static/js/[name].[chunkhash:8].chunk.js',
    // This is the URL that app is served from.
    publicPath,
    // Point sourcemap entries to original disk location
    devtoolModuleFilenameTemplate: info =>
      isDebug
        ? path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
        : path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: ['node_modules', paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
    },
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(paths.appSrc, [loadableChunkFilename, paths.appMainfest]),
    ],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // Transform ES6 with Babel
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            exclude: /node_modules/,
            use: isDebug
              ? ['happypack/loader?id=jsx']
              : require.resolve('babel-loader'),
          },
          // Css.
          {
            test: /\.css$/,
            include: paths.appSrc,
            use: isDebug
              ? ['happypack/loader?id=css']
              : ExtractTextPlugin.extract(
                  Object.assign(
                    {
                      fallback: require.resolve('style-loader'),
                      use: getStyleLoader('css'),
                    },
                    extractTextPluginOptions
                  )
                ),
          },
          // Scss.
          {
            test: /\.scss$/,
            include: paths.appSrc,
            use: isDebug
              ? ['happypack/loader?id=scss']
              : ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: getStyleLoader('sass'),
                }),
          },
          // Less
          {
            test: /\.less$/,
            include: paths.appSrc,
            use: isDebug
              ? ['happypack/loader?id=less']
              : ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: getStyleLoader('less'),
                }),
          },
          // svg
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/svg+xml',
              name: 'images/[name].[ext]',
            },
          },
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.(css|scss)/,
      options: {
        ident: 'postcss',
        postcss(wp) {
          return [
            // require('postcss-import')({ addDependencyTo: wp }),
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009',
            }),
          ];
        },
        eslint: {
          // Use eslintrc file from app root,
          configFile: '../.eslintrc',
        },
      },
    }),
    // For some reason, Webpack adds some ids of all the modules that exist to our vendor chunk
    // Instead of using numerical ids it uses a unique path to map our request to a module.
    // Thanks to this change the vendor hash will now always stay the same
    new webpack.NamedModulesPlugin(),
    ...(isDebug
      ? [
          new webpack.HotModuleReplacementPlugin(),
          // Use happypack process JS/JSX
          new HappyPack({
            id: 'jsx',
            threadPool: happyThreadPool,
            loaders: [
              {
                // react-hot-loader/webpack only works on exported components, whereas
                // react-hot-loader/babel picks up all top-level variables in your files.
                // As a workaround, with Webpack, you can export all the components whose
                // state you want to maintain, even if they’re not imported anywhere else.
                loader: require.resolve('react-hot-loader/webpack'),
              },
              {
                loader: 'cache-loader',
              },
              {
                loader: require.resolve('babel-loader'),
                options: {
                  // This is a feature of `babel-loader` for webpack (not Babel itself).
                  // It enables caching results in ./node_modules/.cache/babel-loader/
                  // directory for faster rebuilds.
                  cacheDirectory: true,
                },
              },
            ],
            verbose: false,
          }),
          // Use happpack process scss
          new HappyPack({
            id: 'scss',
            loaders: [
              {
                loader: 'cache-loader',
              },
              {
                loader: 'style-loader',
              },
              ...getStyleLoader('sass'),
            ],
            verbose: false,
          }),
          // Use happypack process less
          new HappyPack({
            id: 'less',
            loaders: [
              {
                loader: 'cache-loader',
              },
              {
                loader: 'style-loader',
              },
              ...getStyleLoader('less'),
            ],
            verbose: false,
          }),
          // Use happypack process css
          new HappyPack({
            id: 'css',
            loaders: [
              {
                loader: 'cache-loader',
              },
              {
                loader: require.resolve('style-loader'),
              },
              ...getStyleLoader('css'),
            ],
            verbose: false,
          }),
        ]
      : []),
    // Minify the code.
    ...(!isDebug
      ? [
          new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
              compress: {
                warnings: false,
                // Disabled because of an issue with Uglify breaking seemingly valid code:
                // https://github.com/facebookincubator/create-react-app/issues/2376
                // Pending further investigation:
                // https://github.com/mishoo/UglifyJS2/issues/2011
                comparisons: false,
              },
              output: {
                comments: false,
              },
            },
          })
        ]
      : []),
  ],
  performance: { hints: isDebug ? false : 'warning' },
};
