import { all, put, fork, takeEvery, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { constants, actions } from './reducer';
import { setAuth } from '../App/reducer';
import { makeGetForm } from './selectors';
import { login } from '../../utils/auth';

const { LOGIN_REQUEST } = constants;
const { loginFail, loginSuccess } = actions;

/* workers */

function* loginRequest() {
  const { username, password } = yield select(makeGetForm());
  const response = yield login(username, password);

  if (response.error) {
    yield put(loginFail(response.message));
  }

  if (!response.error) {
    yield all([put(loginSuccess()), put(setAuth(username)), put(push('/'))]);
  }
}

/* watcher */

function* watchLoginRequest() {
  yield takeEvery(LOGIN_REQUEST, loginRequest);
}

export default function* loginSagas() {
  yield all([fork(watchLoginRequest)]);
}
