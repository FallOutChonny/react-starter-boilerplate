const config = require('./webpack.config');
const dllConfig = require('./webpack.dll.config');
const createConfig = require('./createConfig');
const createDevServerConfig = require('./webpackDevServer.config');
const {
  compile,
  createCompiler,
  createCompilationPromise,
} = require('./createCompiler');

const isDebug = process.env.NODE_ENV === 'development';
const isAnalyze =
  process.env.BUNDLE_ANALYZE && process.env.BUNDLE_ANALYZE !== 'false';

module.exports = {
  config: dllConfig,
  compile,
  createCompiler,
  createCompilationPromise,
  createDevServerConfig,
  createConfig: target => createConfig(target, config, { isDebug, isAnalyze }),
};
