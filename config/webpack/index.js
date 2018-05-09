const config = require('./webpack.config');
const dllConfig = require('./webpack.dll.config');
const createConfig = require('./createConfig');
const createDevServerConfig = require('./webpackDevServer.config');
const compile = require('./createCompiler');

const isDebug = process.env.NODE_ENV === 'development';
const useBS =
  process.env.SHOULD_USE_BOOTSTRAP &&
  process.env.SHOULD_USE_BOOTSTRAP !== 'false';
const isAnalyze =
  process.env.BUNDLE_ANALYZE && process.env.BUNDLE_ANALYZE !== 'false';

const options = {
  isDebug,
  useBS,
  isAnalyze,
};

module.exports = {
  config: dllConfig,
  compile,
  createDevServerConfig,
  createConfig: target => createConfig(target, config, options),
};
