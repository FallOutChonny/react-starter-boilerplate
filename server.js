/* eslint-disable no-underscore-dangle */

// Use babel-register to precompile ES6 syntax
require('./babel-register');

const path = require('path');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
// This should be the same with webpack context
const rootDir = path.join(process.cwd());

// Define isomorphic constants.
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false; // Disable server side render here
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
global.__DLLS__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  if (
    !require('piping')({
      // main: './src/server.js',
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })
  ) {
    return;
  }
}

// Settings of webpack-isomorphic-tools
global.webpackIsomorphicTools = new WebpackIsomorphicTools(
  require('./config/webpack-isomorphic.config')
).server(rootDir, () => require('./src/server'));
