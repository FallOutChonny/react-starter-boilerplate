import http from 'http';
import Loadable from 'react-loadable';
import app from './server';
import { port, host, isDev } from './config';

const server = new http.Server(app);
let currentApp = app;

(async () => {
  if (port) {
    await Loadable.preloadAll();

    server.listen(port, host, err => {
      const url = `http://${host}${port && `:${port}`}`;

      if (err) {
        console.error(err);
      }

      // Only display on production.
      if (!isDev) {
        console.info(`🚀  You can now view app on ${url} in the browser`);
      }
    });
  } else {
    console.error(
      '==>     ERROR: No PORT environment variable has been specified'
    );
  }
})();

if (module.hot) {
  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    const newApp = require('./server').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}
