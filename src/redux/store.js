import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import reducer from './reducers';
import SagaManager from './rootSaga';

const configureStore = preloadedState => {
  // Create saga middleware
  const sagaMiddleware = createSagaMiddleware();
  // Create middleware function, which contains all normal
  const middleware = [
    /* Put your middleware here */
    sagaMiddleware,
  ];
  // Create enhancer for development session
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

  // Create final store and subscribe router in debug env ie. for devtools
  const store = createStore(
    reducer,
    preloadedState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
  // Run sagas
  SagaManager.runSagas(sagaMiddleware);
  // Let store can execute run sagas's command
  store.runSaga = sagaMiddleware.run;
  // When store closed, dispatch END action
  store.close = () => store.dispatch(END);
  // Enable hot module reloading for reducers and sagas
  if (module.hot) {
    module.hot.accept('./reducers.js', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });

    module.hot.accept('./rootSaga', () => {
      SagaManager.cancelSagas(store);
      require('./rootSaga').default.runSagas(sagaMiddleware);
    });
  }

  return store;
};

export default configureStore;
