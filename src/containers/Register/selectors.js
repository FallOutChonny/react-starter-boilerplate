import { createSelector } from 'reselect';

const registerSelector = state => state.register;

// prettier-ignore
export const makeGetLoading = () => createSelector(
  registerSelector,
  registerState => registerState.loading
);

// prettier-ignore
export const makeGetError = () => createSelector(
  registerSelector,
  registerState => registerState.error
);
