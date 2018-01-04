const autoprefixer = require('autoprefixer');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const NameAllModulesPlugin = require('name-all-modules-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const bootstrapConfig = require('./bootstrap.config.js');
const getClientEnvironment = require('./env');
const paths = require('./paths');
const pkg = require(paths.appPackageJson);

const isDebug = process.env.NODE_ENV === 'development';
const isAnalyze =
  process.env.BUNDLE_ANALYZE && process.env.BUNDLE_ANALYZE !== 'false';

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = isDebug ? 'http://localhost:3001/' : paths.servedPath;
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = isDebug ? '/' : publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);
const context = require('path').join(process.cwd());
const isDLLExist = fs.existsSync(paths.appDllManifestPath);
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

const cssFilename = 'static/css/[name].[contenthash:8].css';
const shouldUseRelativeAssetPaths = publicPath === './';
const extractTextPluginOptions = shouldUseRelativeAssetPaths
	? // Making sure that the publicPath goes back to build folder.
		{ publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('./webpack-isomorphic.config')
);

// Use a common function to handle css|less|scss loaders
function getStyleLoader(id) {
  if (!id) {
    throw new Error('id cannot be null or undefined');
  }

  return [
    {
      loader: require.resolve('css-loader'),
      options: {
        minimize: true,
        // Enable css module
        modules: true,
        localIdentName: '[local]___[hash:base64:5]',
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
    ...(id === 'css'
      ? {}
      : {
          loader: `${id}-loader`,
          options: {
            outputStyle: 'expanded',
            sourceMapContents: true,
            sourceMap: true,
          },
        }),
  ];
}

// Configure woff|woff2|eot|ttf|svg loaders for font-awesome fonts,
// and configure webpack-isomorphic-tools for image files.
const webpackLoaders = [
  // woff
  {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      mimetype: 'application/font-woff',
      name: 'fonts/[name].[ext]',
    },
  },
  // woff2
  {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      mimetype: 'application/font-woff',
      name: 'fonts/[name].[ext]',
    },
  },
  // ttf
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      mimetype: 'application/octet-stream',
      name: 'fonts/[name].[ext]',
    },
  },
  // eot
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader',
    options: {
      name: 'fonts/[name].[ext]',
    },
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
  // Webpack isomorphic tool
  {
    test: webpackIsomorphicToolsPlugin.regular_expression('images'),
    loader: 'url-loader',
    options: {
      limit: 10240,
    },
  },
];

// Shared webpack config for devopment and production
const config = {
  // Don't attempt to continue if there are any errors.
  bail: !isDebug,
  cache: isDebug,
  // We generate sourcemaps in production. This is slow but gives good results.
	// You can exclude the *.map files from the build during deployment.
  devtool: isDebug ? 'cheap-module-source-map' : 'source-map',
  entry: {
    vendor: [
      // Third party packages
      ...(isDebug ? [] : pkg.appVendors),
      // Load Bootstrap styles and scripts in Webpack bundle
      bootstrapConfig,
      // Font-awesome package for webpack, although this requires configure
      // less-loader, but it only need to configure webpack without having to
      // modify the client's code that can keep code clean, so I prefer to use it.
      'font-awesome-webpack!./config/font-awesome.config.js',
    ],
    main: [
      // We ship a few polyfills by default:
      require.resolve('./polyfills'),
      ...(isDebug
        ? [
            // activate HMR for React
            'react-hot-loader/patch',
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint
            // 'webpack-dev-server/client?http://localhost:3000',
            'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr',
            // bundle the client for hot reloading
            // only- means to only hot reload for successful updates
            'webpack/hot/only-dev-server',
            // Errors should be considered fatal in development
            require.resolve('react-error-overlay')
          ]
        : []),
      // Finally, this is your app's code:
      paths.appIndexJs,
      // We include the app code last so that if there is a runtime error during
      // initialization, it doesn't blow up the WebpackDevServer client, and
      // changing JS code would still trigger a refresh.
    ],
  },
  output: {
    // The build folder.
    path: paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: isDebug,
    // Generated JS file names (with nested folders).
		// There will be one main bundle, and one file per asynchronous chunk.
		// We don't currently advertise code splitting but Webpack supports it.
    filename: isDebug ? 'static/js/[name].js' : 'static/js/[name].[chunkhash:8].js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: isDebug
      ? 'static/js/[name].chunk.js'
      : 'static/js/[name].[chunkhash:8].chunk.js',
    // This is the URL that app is served from.
    publicPath: publicPath,
    // Point sourcemap entries to original disk location
    devtoolModuleFilenameTemplate: info => isDebug
      ? path.resolve(info.absoluteResourcePath)
      : path.relative(paths.appSrc, info.absoluteResourcePath),
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
      new ModuleScopePlugin(paths.appSrc),
    ],
    mainFields: ['jsnext:main', 'main'],
  },
  module: {
    strictExportPresence: true,
    rules: [
			// First, run the linter.
			// It's important to do this before Babel processes the JS.
			{
				test: /\.(js|jsx)$/,
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
    ],
  },
  plugins: [
    // Configuration global scss|css loader options, this is new feature
    // introduced from webpack 2. NOTE: maybe removed from webpack.
    new webpack.LoaderOptionsPlugin({
      test: /\.(css|scss)/,
      options: {
        ident: 'postcss',
        postcss: function(wp) {
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
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin(env.raw),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin(
      Object.assign({}, env.stringified, {
        __DEVELOPMENT__: isDebug,
        __DLLS__: isDebug,
        __CLIENT__: true,
        __SERVER__: false,
        __DEVTOOLS__: isDebug,
      })
    ),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({ fileName: 'asset-manifest.json' }),
    // Generate a JSON file which contains a mapping of all loadable chunk files
    // so that we can use this data on server-side rendering.
    new ReactLoadablePlugin({
      filename: path.join(paths.appBuild, 'loadable-chunks.json')
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ...(isDebug
      ? [webpackIsomorphicToolsPlugin.development()]
      : [webpackIsomorphicToolsPlugin]),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    ...(isDebug ? [new WatchMissingNodeModulesPlugin(paths.appNodeModules)] : []),
    // This is necessary to emit hot updates (currently CSS only):
    ...(isDebug ? [new webpack.HotModuleReplacementPlugin()] : []),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    ...(isDebug ? [new CaseSensitivePathsPlugin()] : []),
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    ...(isDebug ? [] : [new ExtractTextPlugin({ filename: cssFilename })]),
    // Generates an `index.html` file with the <script> injected.
    ...(isDebug
      ? []
      : [
          new HtmlWebpackPlugin({
            inject: true,
            template: 'src/pwa.js',
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          })
        ]),
    // Generate a service worker script that will precache, and keep up to date,
		// the HTML & assets that are part of the Webpack build.
    ...(isDebug
      ? []
      : [
          new SWPrecacheWebpackPlugin({
            // By default, a cache-busting query parameter is appended to requests
            // used to populate the caches, to ensure the responses are fresh.
            // If a URL is already hashed by Webpack, then there is no concern
            // about it being stale, and the cache-busting can be skipped.
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            logger(message) {
              if (message.indexOf('Total precache size is') === 0) {
                // This message occurs for every build and is a bit too noisy.
                return;
              }
              console.log(message);
            },
            minify: true,
            // For unknown URLs, fallback to the index page
            navigateFallback: publicUrl + '/index.html',
            // Ignores URLs starting from /__ (useful for Firebase):
            // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
            navigateFallbackWhitelist: [/^(?!\/__).*/],
            // Don't precache sourcemaps (they're large) and build asset manifest:
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
            // Work around Windows path issue in SWPrecacheWebpackPlugin:
            // https://github.com/facebookincubator/create-react-app/issues/2235
            stripPrefix: paths.appBuild.replace(/\\/g, '/') + '/',
          }),
        ]),
    // Minify the code.
    ...(isDebug
      ? []
      : [
          new webpack.optimize.UglifyJsPlugin({
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
            sourceMap: true,
          })
        ]),
    // Split vendor libraries from main bundle
    ...(isDebug
      ? []
      : [
          new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['vendor', 'main'],
            filename: 'static/js/[name]-[chunkhash:8].js',
            minChunks({ context }) {
              return context && context.indexOf('node_modules') !== -1;
            },
          })
        ]),
    // https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
    // Name the modules that were not named by the previous plugins
    ...(isDebug ? [] : [new NameAllModulesPlugin()]),
    // Ensure that every chunks have an actual name and not an id
    // If the chunk has a name, this name is used
    // otherwise the name of the file is used
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name;
      }
      const chunkNames = chunk.mapModules(m => m);
      // Sort the chunks by their depths
      // The chunk with the lower depth is the imported one
      // The others are its dependencies
      chunkNames.sort((chunkA, chunkB) => chunkA.depth - chunkB.depth);
      // Get the absolute path of the file
      const fileName = chunkNames[0].resource;
      // Return the name of the file without the extension
      return path.basename(fileName, path.extname(fileName));
    }),
    // Clean build folder before building
    ...(isDebug ? [] : [new CleanWebpackPlugin(paths.appBuild)]),
    // Represents bundle content as convenient interactive zoomable treemap
		...(isAnalyze
      ? [
          new BundleAnalyzerPlugin({
            // Can be `server`, `static` or `disabled`.
            // In `server` mode analyzer will start HTTP server to show bundle report.
            // In `static` mode single HTML file with bundle report will be generated.
            // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
            analyzerMode: 'static',
            // Host that will be used in `server` mode to start HTTP server.
            analyzerHost: '127.0.0.1',
            // Port that will be used in `server` mode to start HTTP server.
            analyzerPort: 8888,
            // Path to bundle report file that will be generated in `static` mode.
            // Relative to bundles output directory.
            reportFilename: 'report.html',
            // Module sizes to show in report by default.
            // Should be one of `stat`, `parsed` or `gzip`.
            // See "Definitions" section for more information.
            defaultSizes: 'parsed',
            // Automatically open report in default browser
            openAnalyzer: true,
            // If `true`, Webpack Stats JSON file will be generated in bundles output directory
            generateStatsFile: true,
            // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
            // Relative to bundles output directory.
            statsFilename: 'stats.json',
            // Options for `stats.toJson()` method.
            // For example you can exclude sources of your modules from stats file with `source: false` option.
            // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
            statsOptions: null,
            // Log level. Can be 'info', 'warn', 'error' or 'silent'.
            logLevel: 'info',
          }),
        ]
      : []),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  performance: { hints: isDebug ? false : 'warning' },
};

if (isDebug) {
  module.exports = {
    ...config,
    context: context,
    module: {
      strictExportPresence: config.module.strictExportPresence,
      rules: [
        ...config.module.rules,
        {
          oneOf: [
            // Process JS with Babel.
            {
              test: /\.(js|jsx)$/,
              include: paths.appSrc,
              exclude: /node_modules/,
              loaders: ['happypack/loader?id=jsx'],
            },
            // Process CSS.
            {
              test: /\.css$/,
              loaders: ['happypack/loader?id=css'],
            },
            // Process SCSS.
            {
              test: /\.scss$/,
              include: paths.appSrc,
              loaders: ['happypack/loader?id=scss'],
            },
            // Process LESS
            {
              test: /\.less$/,
              include: paths.appSrc,
              loader: 'happypack/loader?id=less',
            },
            ...webpackLoaders,
          ],
        }
      ],
    },
    plugins: [
      ...config.plugins,
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
      // Use happpack process SCSS
      new HappyPack({
        id: 'scss',
        loaders: [
          {
            loader: 'cache-loader',
          },
          {
            loader: 'style-loader',
          },
          ...getStyleLoader('scss'),
        ],
        verbose: false,
      }),
      // Use happypack process LESS
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
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
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
      // Use DLL plugins if DLL files is generated
      ...(isDLLExist
        ? [
            new webpack.DllReferencePlugin({
              context: context,
              manifest: require(paths.appDllManifestPath),
            })
          ]
        : []),
    ]
  };
}

if (!isDebug) {
  module.exports = {
    ...config,
    module: {
      strictExportPresence: config.module.strictExportPresence,
      rules: [
        ...config.module.rules,
        {
          oneOf: [
            // Process JS with Babel.
            {
              test: /\.(js|jsx)$/,
              include: paths.appSrc,
              loader: require.resolve('babel-loader'),
            },
            // Process CSS
            {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract(
                Object.assign(
                  {
                    fallback: require.resolve('style-loader'),
                    use: getStyleLoader('css'),
                  },
                  extractTextPluginOptions
                )
              ),
              // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
            },
            // Process SCSS.
            {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: getStyleLoader('scss'),
              }),
            },
            // Process LESS
            {
              test: /\.less$/,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: getStyleLoader('less'),
              }),
            },
            ...webpackLoaders,
          ],
        }
      ]
    }
  };
}
