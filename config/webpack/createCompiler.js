const chalk = require('chalk');
const webpack = require('webpack');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

function printInstructions(appName, urls, useYarn) {
  console.log();
  console.log(`You can now view ${chalk.bold(appName)} in the browser.`);
  console.log();

  if (urls.lanUrlForTerminal) {
    console.log(
      `  ${chalk.bold('Local:')}            ${urls.localUrlForTerminal}`
    );
    console.log(
      `  ${chalk.bold('On Your Network:')}  ${urls.lanUrlForTerminal}`
    );
  } else {
    console.log(`  ${urls.localUrlForTerminal}`);
  }

  console.log();
  console.log('Note that the development build is not optimized.');
  console.log(
    `To create a production build, use ` +
      `${chalk.cyan(`${useYarn ? 'yarn' : 'npm run'} build`)}.`
  );
  console.log();
}

function compile(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (err) {
    console.log(chalk.red('Failed to compile.'));
    console.log();
    console.log(err.message || err);
    console.log();
    process.exit(1);
  }
  return compiler;
}

function createCompiler(config, appName, urls, useYarn) {
  const compiler = compile(config);

  let isFirstCompile = true;

  compiler.plugin('done', stats => {
    if (isFirstCompile) {
      clearConsole();
    }

    const messages = formatWebpackMessages(stats.toJson({}, true));
    const isSuccessful = !messages.errors.length && !messages.warnings.length;

    if (isSuccessful && isFirstCompile) {
      console.log(chalk.green('Compiled successfully!'));
      printInstructions(appName, urls, useYarn);
    }
    isFirstCompile = false;

    if (messages.errors.length) {
      if (messages.errors.length > 1) {
        messages.errors.length = 1;
      }
      console.log(chalk.red('Failed to compile.\n'));
      console.log(messages.errors.join('\n\n'));
    }

    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.\n'));
      console.log(messages.warnings.join('\n\n'));

      console.log(
        '\nSearch for the ' +
          chalk.underline(chalk.yellow('keywords')) +
          ' to learn more about each warning.'
      );
      console.log(
        'To ignore, add ' +
          chalk.cyan('// eslint-disable-next-line') +
          ' to the line before.\n'
      );
    }
  });

  return compiler;
}

function createCompilationPromise(compiler) {
  return new Promise((resolve, reject) => {
    compiler.plugin('done', stats => {
      if (stats.hasErrors()) {
        reject(
          new Error(
            formatWebpackMessages(stats.toJson({}, true)).errors.join('\n\n')
          )
        );
        console.log(chalk.red('Failed to compile.\n'));
      }

      resolve(stats);
    });
  });
}

module.exports = {
  compile,
  createCompiler,
  createCompilationPromise,
};
