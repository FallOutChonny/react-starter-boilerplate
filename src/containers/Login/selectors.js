import { createSelector } from 'reselect';

const loginSelector = state => state.get('login');

// prettier-ignore
export const makeGetForm = () => createSelector(
  loginSelector,
  loginState => loginState.get('formState')
);

// prettier-ignore
export const makeGetLoading = () => createSelector(
  loginSelector,
  loginState => loginState.get('loading')
);

// prettier-ignore
export const makeGetError = () => createSelector(
  loginSelector,
  loginState => loginState.get('error')
);
