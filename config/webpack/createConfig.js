/* eslint-disable indent, import/no-dynamic-require */
const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const StartServerPlugin = require('start-server-webpack-plugin');
// const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const WatchMissingNodeModulesPlugin = require('./WatchMissingNodeModulePlugin');
const nodeExternals = require('webpack-node-externals');
const getClientEnvironment = require('../env');
const paths = require('../paths');

module.exports = (target = 'web', webpackConfig, options) => {
  const { isDebug, isAnalyze } = options;
  const isServer = target === 'node';
  const isClient = target === 'web';

  const publicPath = isDebug ? 'http://localhost:3001/' : paths.servedPath;
  const publicUrl = isDebug ? 'http://localhost:3001' : publicPath.slice(0, -1);
  const isDllExist = fs.existsSync(paths.appDllManifest);

  const env = getClientEnvironment(publicUrl);
  const envs = Object.assign({}, env.stringified, {
    __DEV__: isDebug,
    __DLLS__: isDebug,
  });

  // const config = { ...webpackConfig, target };
  const config = webpackConfig(target);

  if (isServer) {
    const nodeArgs = [];

    // Add --inspect or --inspect-brk flag when enabled
    if (process.env.INSPECT_BRK_ENABLED) {
      nodeArgs.push('--inspect-brk');
    } else if (process.env.INSPECT_ENABLED) {
      nodeArgs.push('--inspect');
    }

    config.node = { console: true, __filename: true, __dirname: true };

    config.externals = [
      nodeExternals({
        whitelist: [
          isDebug ? 'webpack/hot/poll?1000' : null,
          /\.(eot|woff|woff2|ttf|otf)$/,
          /\.(svg|png|jpg|jpeg|gif|ico)$/,
          /\.(mp4|mp3|ogg|swf|webp)$/,
          /\.(css|scss|sass|sss|less)$/,
        ].filter(x => x),
      }),
    ];

    config.entry = [
      // Enable hot-reload on server-side
      ...(isDebug ? ['webpack/hot/poll?1000'] : []),
      // App's code
      paths.appServerIndexJs,
    ];

    config.watch = isDebug;

    config.output = {
      path: paths.appBuild,
      filename: 'server.js',
    };

    // Add server-only plugins
    config.plugins = [
      ...config.plugins,
      // Prevent creating multiple chunks for the server
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
      new webpack.DefinePlugin({ ...envs, __CLIENT__: false, __SERVER__: true }),
      // Add development plugins
      ...(isDebug
        ? [
            // Automatically start the server when we are done compiling
            new StartServerPlugin({ name: 'server.js', nodeArgs }),
            // Supress errors to console (we use our own logger)
            new webpack.NoEmitOnErrorsPlugin(),
            // Ignore assets.json to avoid infinite recompile bug
            // new webpack.WatchIgnorePlugin([paths.appManifest]),
          ]
        : []),
    ];
  }

  if (isClient) {
    config.entry = {
      // vendor: [
      //   ...(isDebug ? [] : pkg.appVendors),
      //   ...(useBS ? [bootstrapConfig] : []),
      // ],
      main: [
        // We ship a few polyfills by default:
        require.resolve('../polyfills'),
        // Enable hot-reload on client side
        ...(isDebug
          ? [
              'react-hot-loader/patch',
              // bundle the client for webpack-dev-server
              // and connect to the provided endpoint
              'webpack-dev-server/client?http://localhost:3001',
              // bundle the client for hot reloading
              // only- means to only hot reload for successful updates
              'webpack/hot/only-dev-server',
              // Errors should be considered fatal in development
              require.resolve('react-error-overlay'),
            ]
          : []),
        // Finally, this is your app's code:
        paths.appIndexJs,
      ],
    };

    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    config.node = {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    };

    // Add client-only plugins
    config.plugins = [
      ...config.plugins,
      new ReactLoadablePlugin({
        filename: path.join(paths.appBuild, 'loadable-chunks.json'),
      }),
      // Moment.js is an extremely popular library that bundles large locale files
      // by default due to how Webpack interprets its code. This is a practical
      // solution that requires the user to opt into importing specific locales.
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // You can remove this if you don't use Moment.js:
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new AssetsPlugin({
        path: paths.appBuild,
        filename: 'assets.json',
      }),
      new webpack.DefinePlugin({
        ...envs,
        __CLIENT__: true,
        __SERVER__: false,
      }),
      // Add development plugins
      ...(isDebug
        ? [
            new CaseSensitivePathsPlugin(),
            new WatchMissingNodeModulesPlugin(paths.appNodeModules),
          ]
        : []),
      // Add production plugins
      ...(!isDebug
        ? [
            // Generate a manifest file which contains a mapping of all asset filenames
            // to their corresponding output file so that tools can pick it up without
            // having to parse `index.html`.
            new ManifestPlugin({
              fileName: 'asset-manifest.json',
              publicPath: publicPath,
            }),
            // https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
            // Name the modules that were not named by the previous plugins
            // new NameAllModulesPlugin(),
            // new webpack.optimize.ModuleConcatenationPlugin(),
            // Generates an `index.html` file with the <script> injected.
            new HtmlWebpackPlugin({
              inject: true,
              template: paths.appHtml,
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
            }),
            // Generate a service worker script that will precache, and keep up to date,
            // the HTML & assets that are part of the Webpack build.
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
              staticFileGlobsIgnorePatterns: [
                /\.map$/,
                /asset-manifest\.json$/,
              ],
              // Work around Windows path issue in SWPrecacheWebpackPlugin:
              // https://github.com/facebookincubator/create-react-app/issues/2235
              stripPrefix: paths.appBuild.replace(/\\/g, '/') + '/',
            }),
          ]
        : []),
      // The runtime is the part of Webpack that resolves modules
      // at runtime and handles async loading and more
      // new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
      // Represents bundle content as convenient interactive zoomable treemap
      ...(isAnalyze
        ? [
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              generateStatsFile: true,
            }),
          ]
        : []),
      // Use DLL plugins if DLL files is generated
      ...(isDebug && isDllExist
        ? [
            new webpack.DllReferencePlugin({
              context: path.join(process.cwd()),
              manifest: require(paths.appDllManifest),
            }),
          ]
        : []),
    ];


    if (!isDebug) {
      config.optimization = {
        // Automatically split vendor and commons
        // https://twitter.com/wSokra/status/969633336732905474
        splitChunks: {
          name: 'vendor',
          chunks: 'all',
        },
        // Keep the runtime chunk seperated to enable long term caching
        // https://twitter.com/wSokra/status/969679223278505985
        runtimeChunk: {
          name: 'manifest'
        },
      };
    }
  }

  return config;
};
