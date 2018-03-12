import { put, fork, take, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { logout } from 'utils/auth';
import * as types from './constants';
import { setAuth } from './actions';
import { LOGIN_SUCCESS } from '../Login/reducer';

function* logoutRequest() {
  yield logout();
  yield put({ type: types.LOGOUT_SUCCESS });
  yield put(push('/'));
}

function* watchLogoutRequest() {
  yield takeEvery(types.LOGOUT_REQUEST, logoutRequest);
}

function* watchLoginSuccess() {
  while (true) {
    const { loggedIn } = yield take(LOGIN_SUCCESS);

    yield put(setAuth(loggedIn));
  }
}

export default [fork(watchLogoutRequest), fork(watchLoginSuccess)];
