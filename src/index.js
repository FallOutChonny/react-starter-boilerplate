import React from 'react';
import { AppContainer as HotReloader } from 'react-hot-loader';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'react-router/Router';
import createHistory from 'history/createBrowserHistory';
import getRoutes from './routes';
import createStore from './redux/store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = createStore();
const history = createHistory();
const rootEl = document.getElementById('root');

const renderApp = routes =>
  render(
    <HotReloader>
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
    </HotReloader>,
    rootEl,
  );

renderApp(getRoutes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const nextRoutes = require('./routes').default;
    renderApp(nextRoutes);
  });
}

registerServiceWorker();
