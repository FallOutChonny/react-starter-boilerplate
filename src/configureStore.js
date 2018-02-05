import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import routerMiddleware from 'react-router-redux/middleware';
import rootSaga from './sagas';
import createReducer from './reducers';

const configureStore = (history, initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const reduxRouterMiddleware = routerMiddleware(history);
  const middlewares = [sagaMiddleware, reduxRouterMiddleware];
  const enhancers = [];

  if (__DEVELOPMENT__ && __CLIENT__) {
    const { persistState } = require('redux-devtools');
    const { devToolsExtension: devToolsExt, location: { href } } = window;
    const DevTools = require('./components/DevTools').default;
    const devTools = devToolsExt ? devToolsExt() : DevTools.instrument();
    enhancers.push(devTools);
    enhancers.push(persistState(href.match(/[?&]debug_session=([^&]+)\b/)));
  }

  const reducer = createReducer();
  const store = createStore(
    reducer,
    fromJS(initialState),
    compose(applyMiddleware(...middlewares), ...enhancers)
  );

  rootSaga.runSagas(sagaMiddleware);
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Reducer registry
  // store.asyncSagas = {}; // Saga registry
  // store.close = () => store.dispatch(END);

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
};

export default configureStore;
