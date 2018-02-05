const rimraf = require('rimraf');

function cleanDir(pattern, options) {
  return new Promise((resolve, reject) =>
    rimraf(
      pattern,
      { glob: options },
      (err, result) => (err ? reject(err) : resolve(result)),
    ),
  );
}

module.exports = function clean() {
  return cleanDir('build/*', {
    nosort: true,
    dot: true,
    ignore: ['build/dll'],
  });
};
