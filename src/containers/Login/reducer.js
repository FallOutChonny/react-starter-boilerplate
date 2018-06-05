/**
 * If the module is not too complicated or too big, it is recommended that
 * you can use the duck modular redux style
 */
import createReducer from 'utils/createReducer';

export const LOGIN_REQUEST = 'app/login/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'app/login/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'app/login/LOGIN_FAILURE';
export const CHANGE_FORM = 'app/login/CHANGE_FORM';

const initialState = {
  loading: false,
  formState: {
    username: '',
    password: '',
  },
  error: null,
};

const reducer = createReducer(
  {
    [LOGIN_REQUEST]: state => ({ ...state, loading: true, error: null }),

    [LOGIN_FAILURE]: (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }),

    [LOGIN_SUCCESS]: state => ({ ...state, loading: false }),

    [CHANGE_FORM]: (state, { formState }) => ({ ...state, formState }),
  },
  initialState
);

export const login = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFail = error => ({
  type: LOGIN_FAILURE,
  error,
});

export const changeForm = formState => ({
  type: CHANGE_FORM,
  formState,
});

const constants = {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CHANGE_FORM,
};

const actions = {
  login,
  loginSuccess,
  loginFail,
  changeForm,
};

export { reducer, actions, constants };

export default reducer;
