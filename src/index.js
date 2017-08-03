import React from 'react';
import { AppContainer as HotReloader } from 'react-hot-loader';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const history = createHistory();
const rootEl = document.getElementById('root');

const renderApp = () =>
  render(
    <HotReloader>
      <Routes history={history} />
    </HotReloader>,
    rootEl,
  );

renderApp();

if (module.hot) {
  module.hot.accept('./routes', () => renderApp());
}

registerServiceWorker();
