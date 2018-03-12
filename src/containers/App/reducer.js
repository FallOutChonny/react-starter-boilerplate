import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';
import * as auth from 'utils/auth';
import * as types from './constants';

export const initialState = fromJS({
  loggedIn: auth.loggedIn(),
  loading: false,
  error: null,
});

export default createReducer(
  {
    [types.SET_AUTH]: (state, { loggedIn }) => {
      return state.set('loading', true).set('loggedIn', loggedIn);
    },

    [types.LOGOUT_REQUEST]: state => {
      return state.set('loading', true);
    },

    [types.LOGOUT_SUCCESS]: state => {
      return state.clear();
    },

    [types.LOGOUT_FAILURE]: (state, { error }) => {
      return state.set('loading', false).set('error', error);
    },
  },
  initialState
);
