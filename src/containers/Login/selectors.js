import { createSelector } from 'reselect';

const loginSelector = state => state.login;

// prettier-ignore
export const makeGetForm = () => createSelector(
  loginSelector,
  loginState => loginState.formState
);

// prettier-ignore
export const makeGetLoading = () => createSelector(
  loginSelector,
  loginState => loginState.loading
);

// prettier-ignore
export const makeGetError = () => createSelector(
  loginSelector,
  loginState => loginState.error
);
