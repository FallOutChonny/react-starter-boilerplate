/* eslint-disable consistent-return */
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

const chunksPath = path.resolve(process.cwd(), 'build/loadable-chunks.json');

const getChunks = () => {
  try {
    return JSON.parse(fs.readFileSync(chunksPath));
  } catch (error) {
    return [];
  }
};

export default function waitChunks() {
  return new Promise((resolve, reject) => {
    // We can always get chunks file in production, so you can just
    // read file and return do not need to use watcher to watch it.
    if (!__DEVELOPMENT__) {
      return resolve(getChunks());
    }

    const watcher = chokidar.watch(chunksPath, { persistent: true });

    watcher.on('add', () => {
      watcher.close();
      return resolve(getChunks());
    });

    watcher.on('change', () => {
      watcher.close();
      return resolve(getChunks());
    });

    watcher.on('error', err => {
      watcher.close();
      return reject(err);
    });
  });
}
