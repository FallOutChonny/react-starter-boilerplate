import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { AppContainer as HotReloader } from 'react-hot-loader';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import renderRoutes from 'react-router-config/renderRoutes';
import Loadable from 'react-loadable';
import createRoutes from './routes';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';
import './globalStyles';

// App mount node
const rootEl = document.getElementById('app');

(async () => {
  const history = createHistory();
  const store = configureStore(history);
  const routes = createRoutes(store);

  const renderApp = _routes =>
    hydrate(
      <HotReloader>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            {renderRoutes(_routes)}
          </ConnectedRouter>
        </Provider>
      </HotReloader>,
      rootEl
    );

  await Loadable.preloadReady();

  renderApp(routes);

  if (module.hot) {
    module.hot.accept('./routes', () => {
      const nextRoutes = require('./routes');
      const nextAppRoutes = (nextRoutes.default || nextRoutes)(store);
      renderApp(nextAppRoutes);
    });
  }

  if (__DEVTOOLS__ && !window.devToolsExtension) {
    const devToolsEl = document.createElement('div');
    window.document.body.insertBefore(devToolsEl, null);
    const DevTools = require('./components/DevTools');
    hydrate(
      <Provider store={store}>
        <DevTools />
      </Provider>,
      devToolsEl
    );
  }

  registerServiceWorker();
})();
