/**
 * If the module is not too complicated or too big, it is recommended that
 * you can use the duck modular redux style
 */
import createReducer from 'utils/createReducer';

export const REGISTER_REQUEST = 'app/login/REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'app/login/REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'app/login/REGISTER_FAILURE';

const initialState = {
  loading: false,
  error: null,
};

const reducer = createReducer(
  {
    [REGISTER_REQUEST]: state => ({ ...state, loading: true, error: null }),

    [REGISTER_SUCCESS]: state => ({ ...state, loading: false }),

    [REGISTER_FAILURE]: (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }),
  },
  initialState
);

export const register = formData => ({
  type: REGISTER_REQUEST,
  ...formData,
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

export const registerFail = error => ({
  type: REGISTER_FAILURE,
  error,
});

const constants = {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
};

const actions = {
  register,
  registerSuccess,
  registerFail,
};

export { reducer, actions, constants };

export default reducer;
