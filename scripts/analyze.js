'use strict'

process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';
process.env.BUNDLE_ANALYZE = true;

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config/webpack.config.prod');

const compiler = webpack(config);

console.log('Creating webpack stats and zoomable treemap report files...');

compiler.run(err => {
  if (err) {
    console.error(err);
  }
  console.log(chalk.green('Generate files successfuly'));
  console.log(
    chalk.yellow(
      'You can now upload your webpack stats file to http://webpack.github.io/analyse/#hints'
    )
  );
  console.log('Opening treemap report...');
});
