import { all, fork, join } from 'redux-saga/effects';

function waitAll(sagas) {
  return function* genTasks() {
    const tasks = yield all(
      sagas.map(([saga, ...params]) => fork(saga, ...params))
    );
    if (tasks.length) {
      yield join(...tasks);
    }
  };
}

export default waitAll;
