import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';

const configureStore = preloadedState => {
  const middleware = [
    /* Put your middleware here */
  ];
  const enhancers = [];

  if (process.env.NODE_ENV === 'development') {
    const { persistState } = require('redux-devtools');
    const { devToolsExtension: devToolsExt, location: { href } } = window;
    const DevTools = require('../containers/DevTools');

    // Check redux-devtools is from chrome extension or npm package.
    const devTools = devToolsExt ? devToolsExt() : DevTools.instrument();

    // Enable Redux DevTools extension
    enhancers.push(devTools);
    // Lets you write ?debug_session=<name> in URL to persist state
    enhancers.push(persistState(href.match(/[?&]debug_session=([^&]+)\b/)));
  }

  const store = createStore(
    reducer,
    preloadedState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );

  if (module.hot) {
    module.hot.accept('./reducers.js', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
