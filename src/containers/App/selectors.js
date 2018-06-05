import { createSelector } from 'reselect';

const globalSelector = state => state.global;

// prettier-ignore
export const makeGetLoggedIn = () => createSelector(
  globalSelector,
  globalState => globalState.loggedIn
);
