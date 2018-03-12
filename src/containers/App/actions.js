import { LOGOUT_REQUEST, SET_AUTH } from './constants';

export const logout = () => ({
  type: LOGOUT_REQUEST,
});

export const setAuth = loggedIn => ({
  type: SET_AUTH,
  loggedIn,
});
