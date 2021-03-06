/* eslint-disable indent, import/no-dynamic-require */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HappyPack = require('happypack');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const paths = require('../paths');

const isDebug = process.env.NODE_ENV === 'development';

const publicPath = isDebug ? 'http://localhost:3001/' : paths.servedPath;
const context = path.join(process.cwd());
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
// const cssFilename = 'static/css/[name].[contenthash:8].css';
const loadableChunkFilename = path.join(paths.appBuild, 'loadable-chunks.json');
// const shouldUseRelativeAssetPaths = publicPath === './';
// const extractTextPluginOptions = shouldUseRelativeAssetPaths
//   ? // Making sure that the publicPath goes back to build folder.
//     { publicPath: Array(cssFilename.split('/').length).join('../') }
//   : {};

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
        // Enable css module,
        modules: true,
        localIdentName: '[path][name]__[local]___[hash:base64:5]',
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

module.exports = target => {
  const isServer = target === 'node';
  const isClient = target === 'web';

  const config = {
    target,
    // Don't attempt to continue if there are any errors.
    bail: !isDebug,
    cache: isDebug,
    mode: isDebug ? 'development' : 'production',
    context,
    // We generate sourcemaps in production. This is slow but gives good results.
    // You can exclude the *.map files from the build during deployment.
    devtool: isDebug ? 'cheap-module-source-map' : 'source-map',
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
        new ModuleScopePlugin(paths.appSrc, [
          loadableChunkFilename,
          paths.appMainfest,
        ]),
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
          exclude: [/[/\\\\]node_modules[/\\\\]/],
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
                : [MiniCssExtractPlugin.loader, ...getStyleLoader('css')],
            },
            // Scss.
            {
              test: /\.scss$/,
              include: paths.appSrc,
              use: isDebug
                ? ['happypack/loader?id=scss']
                : [MiniCssExtractPlugin.loader, ...getStyleLoader('sass')],
            },
            // Less
            {
              test: /\.less$/,
              include: paths.appSrc,
              use: isDebug
                ? ['happypack/loader?id=less']
                : [MiniCssExtractPlugin.loader, ...getStyleLoader('less')],
            },
            // The GraphQL loader preprocesses GraphQL queries in .graphql files.
            {
              test: /\.(graphql)$/,
              loader: 'graphql-tag/loader',
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
        test: /\.(css|scss|less)/,
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
                ...(isClient
                  ? [
                      {
                        loader: 'style-loader',
                      },
                    ]
                  : []),
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
                ...(isClient
                  ? [
                      {
                        loader: 'style-loader',
                      },
                    ]
                  : []),
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
                ...(isClient
                  ? [
                      {
                        loader: 'style-loader',
                      },
                    ]
                  : []),
                ...getStyleLoader('css'),
              ],
              verbose: false,
            }),
          ]
        : []),
      // Minify the css.
      ...(!isDebug
        ? [
            new MiniCssExtractPlugin({
              filename: 'static/css/[name].[contenthash:8].css',
              chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
            }),
          ]
        : []),
    ],
    performance: { hints: isDebug ? false : 'warning' },
  };

  return config;
};
