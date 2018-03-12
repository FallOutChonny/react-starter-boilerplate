/* eslint-disable no-underscore-dangle */
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import renderRoutes from 'react-router-config/renderRoutes';
import Loadable from 'react-loadable';
import registerServiceWorker from './registerServiceWorker';
import createRoutes from '../routes';
import configureStore from '../configureStore';
import './globalStyles';

const rootEl = document.getElementById('app');

(async () => {
  const history = createHistory();
  const initialState = window.__INITIAL_STATE__;
  const store = configureStore(history, initialState);
  const routes = createRoutes(store);

  await Loadable.preloadReady();

  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {renderRoutes(routes)}
      </ConnectedRouter>
    </Provider>,
    rootEl
  );

  if (module.hot) {
    module.hot.accept();
  }

  if (__DEVTOOLS__ && !window.devToolsExtension) {
    const devToolsEl = document.createElement('div');
    window.document.body.insertBefore(devToolsEl, null);
    const DevTools = require('./createDevTools');
    hydrate(
      <Provider store={store}>
        <DevTools />
      </Provider>,
      devToolsEl
    );
  }

  registerServiceWorker();
})();
