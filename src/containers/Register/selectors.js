import { createSelector } from 'reselect';

const registerSelector = state => state.get('register');

// prettier-ignore
export const makeGetLoading = () => createSelector(
  registerSelector,
  registerState => registerState.get('loading')
);

// prettier-ignore
export const makeGetError = () => createSelector(
  registerSelector,
  registerState => registerState.get('error')
);
