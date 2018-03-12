import { all, put, fork, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { login, register } from 'utils/auth';
import { constants, actions } from './reducer';

const { REGISTER_REQUEST } = constants;
const { registerFail, registerSuccess } = actions;

/* workers */

function* registerRequest({ username, password }) {
  const response = yield register(username, password);

  if (response.error) {
    yield put(registerFail(response.message));
  }

  if (!response.error) {
    yield login(username, password);
    yield put(registerSuccess());
    yield put(push('/'));
  }
}

/* watcher */

function* watchRegisterRequest() {
  yield takeEvery(REGISTER_REQUEST, registerRequest);
}

export default function* registerSagas() {
  yield all([fork(watchRegisterRequest)]);
}
