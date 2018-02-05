'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'development';
process.env.PORT = 3000;

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Use babel-register to precompile ES6 syntax
require('../babel-register');
// Ensure environment variables are read.
require('../config/env');

const fs = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');
const devServer = require('webpack-dev-server');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {
  choosePort,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const paths = require('../config/paths');
const clean = require('./clean');
const buildDLL = require('./buildDLL');
const {
  compile,
  createConfig,
  createCompiler,
  createDevServerConfig,
  createCompilationPromise,
} = require('../config/webpack');

const buildDLLIfNeed = !fs.existsSync(paths.appDllManifest);
const useYarn = fs.existsSync(paths.yarnLockFile);

// // Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appServerIndexJs, paths.appIndexJs])) {
  process.exit(1);
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(+process.env.PORT + 1, 10) || 3001;
const HOST = process.env.HOST || '0.0.0.0';

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  );
  console.log(
    'If this was unintentional, check that you haven\'t mistakenly set it in your shell.'
  );
  console.log(`Learn more here: ${chalk.yellow('http://bit.ly/2mwWSwH')}`);
  console.log();
}

// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `detect()` Promise resolves to the next free port.
choosePort(HOST, DEFAULT_PORT)
  .then(async port => {
    if (port == null) {
      // We have not found a port.
      return;
    }

    // Clean all files and folders in build but exclude dll
    await clean();

    const clientConfig = createConfig('web');
    const serverConfig = createConfig('node');

    if (buildDLLIfNeed) {
      await buildDLL();

      clientConfig.plugins.push(
        new webpack.DllReferencePlugin({
          context: require('path').join(process.cwd()),
          manifest: require(paths.appDllManifest),
        })
      );
    }

    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const appName = require(paths.appPackageJson).name;
    const urls = prepareUrls(protocol, HOST, port - 1);
    // // Load proxy config
    const proxySetting = require(paths.appPackageJson).proxy;
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic);

    const devServerConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig,
      HOST,
      port,
      clientConfig.output.publicPath
    );

    clientConfig.devServer = devServerConfig;

    const clientCompiler = compile(clientConfig);
    const clientDevServer = new devServer(clientCompiler, clientConfig.devServer);

    clientDevServer.listen(port, err => {
      if (err) {
        logger.error(err);
      }
    });

    const clientCompilerPromise = createCompilationPromise(clientCompiler);

    // Wait until client-side bundles are ready
    await clientCompilerPromise;

    const serverCompiler = createCompiler(serverConfig, appName, urls, useYarn);

    // Start our server webpack instance in watch mode.
    serverCompiler.watch(
      {
        quiet: true,
        stats: 'none',
      },
      /* eslint-disable no-unused-vars */
      stats => {}
    );

    ['SIGINT', 'SIGTERM'].forEach((sig) => {
      process.on(sig, () => {
        clientDevServer.close();
        process.exit();
      });
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
