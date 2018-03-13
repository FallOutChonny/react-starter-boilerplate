import { put, fork, takeEvery, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as auth from 'utils/auth';
import { actions, constants } from './reducer';
import { makeGetLoggedIn } from './selectors';

const { logoutSuccess, setAuth } = actions;
const { LOGOUT_REQUEST } = constants;

function* loadAuthIfNeed() {
  const currentUser = auth.loggedIn();
  const loggedIn = yield select(makeGetLoggedIn());

  if (!loggedIn && currentUser) {
    yield put(setAuth(currentUser));
  }
}

function* logoutRequest() {
  auth.logout();
  yield put(logoutSuccess());
  yield put(push('/'));
}

function* watchLogoutRequest() {
  yield takeEvery(LOGOUT_REQUEST, logoutRequest);
}

export { loadAuthIfNeed };

export default [fork(watchLogoutRequest)];
