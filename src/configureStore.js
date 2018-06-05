/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import routerMiddleware from 'react-router-redux/middleware';
import rootSaga from './sagas';
import createReducer from './reducers';

function configureStore(history, initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const reduxRouterMiddleware = routerMiddleware(history);
  const middlewares = [sagaMiddleware, reduxRouterMiddleware];
  const enhancers = [];

  if (__CLIENT__ && __DEV__ && !window.__REDUX_DEVTOOLS_EXTENSION__) {
    const { persistState } = require('redux-devtools').default;
    const DevTools = require('./client/createDevTools').default;
    enhancers.push(DevTools.instrument());
    enhancers.push(
      persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/))
    );
  }

  if (__CLIENT__ && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const store = createStore(
    createReducer(),
    initialState,
    compose(applyMiddleware(...middlewares), ...enhancers)
  );

  rootSaga.runSagas(sagaMiddleware);
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {};
  store.asyncSagas = {};
  store.close = () => store.dispatch(END);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextCreateReducer = require('./reducers').default;
      store.replaceReducer(nextCreateReducer(store.asyncReducers));
    });
    module.hot.accept('./sagas', () => {
      rootSaga.cancelSagas(store);
      require('./sagas').default.runSagas(sagaMiddleware);
    });
  }

  return store;
}

export default configureStore;
