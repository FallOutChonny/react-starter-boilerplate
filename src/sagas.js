import { fork, cancel, take, all } from 'redux-saga/effects';

const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

function* sagas() {
  yield all([]);
}

const rootSaga = [sagas];

const abortableSaga = saga => {
  if (__DEVELOPMENT__) {
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
    rootSaga.map(abortableSaga).forEach(saga => sagaMiddleware.run(saga));
  },

  cancelSagas(store) {
    store.dispatch({ type: CANCEL_SAGAS_HMR });
  },
};
