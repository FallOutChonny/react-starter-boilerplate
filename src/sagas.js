/**
 * The root saga.
 */

import { fork, cancel, take, all } from 'redux-saga/effects';
import globalSagas from './containers/App/saga';

const CANCEL_SAGAS_HMR = '@@saga/cancel-sagas-hmr';

function* sagas() {
  yield all([...globalSagas]);
}

const rootSaga = [sagas];

const createAbortableSaga = saga => {
  if (__DEV__) {
    return function* main() {
      const sagaTask = yield fork(saga);
      yield take(CANCEL_SAGAS_HMR);
      yield cancel(sagaTask);
    };
  }
  return saga;
};

export default {
  runSagas(sagaMiddleware) {
    rootSaga.map(createAbortableSaga).forEach(saga => sagaMiddleware.run(saga));
  },

  cancelSagas(store) {
    store.dispatch({ type: CANCEL_SAGAS_HMR });
  },
};
