/* eslint-disable no-underscore-dangle */
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { consolidateStreamedStyles } from 'styled-components';
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

  const renderApp = _routes =>
    hydrate(
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            {renderRoutes(_routes)}
          </ConnectedRouter>
        </Provider>
      </AppContainer>,
      rootEl
    );

  await Loadable.preloadReady();

  consolidateStreamedStyles();

  renderApp(routes);

  if (module.hot) {
    module.hot.accept('../routes', () => {
      const nextRoutes = require('../routes');
      const nextAppRoutes = (nextRoutes.default || nextRoutes)(store);
      renderApp(nextAppRoutes);
    });
  }

  if (__DEV__ && !window.__REDUX_DEVTOOLS_EXTENSION__) {
    const devToolsEl = document.createElement('div');
    window.document.body.insertBefore(devToolsEl, null);
    const DevTools = require('./createDevTools').default;
    hydrate(
      <Provider store={store}>
        <DevTools />
      </Provider>,
      devToolsEl
    );
  }

  registerServiceWorker();
})();
