import { fork, cancel, take, all } from 'redux-saga/effects';

const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

function* sagas() {
  yield all([]);
}

const createAbortableSaga = saga => {
  if (process.env.NODE_ENV === 'development') {
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
    [sagas].map(createAbortableSaga).forEach(saga => sagaMiddleware.run(saga));
  },

  stopSagas(store) {
    store.dispatch({ type: CANCEL_SAGAS_HMR });
  },
};
