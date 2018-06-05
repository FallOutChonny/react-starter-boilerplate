import createReducer from 'utils/createReducer';
import * as auth from 'utils/auth';

export const SET_AUTH = 'app/global/SET_AUTH';
export const LOGOUT_REQUEST = 'app/global/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'app/global/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'app/global/LOGOUT_FAILURE';

export const initialState = {
  loggedIn: auth.loggedIn(),
  loading: false,
  error: null,
};

const reducer = createReducer(
  {
    [SET_AUTH]: (state, { loggedIn }) => ({
      ...state,
      loading: true,
      loggedIn: loggedIn || '',
    }),

    [LOGOUT_REQUEST]: state => ({ ...state, loading: true }),

    [LOGOUT_SUCCESS]: () => ({ ...initialState, loggedIn: '' }),

    [LOGOUT_FAILURE]: (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }),
  },
  initialState
);

export const logout = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const setAuth = loggedIn => ({
  type: SET_AUTH,
  loggedIn,
});

const constants = {
  SET_AUTH,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
};

const actions = {
  logout,
  logoutSuccess,
  setAuth,
};

export { actions, reducer, constants };

export default reducer;
