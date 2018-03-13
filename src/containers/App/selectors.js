import { createSelector } from 'reselect';

const globalSelector = state => state.get('global');

// prettier-ignore
export const makeGetLoggedIn = () => createSelector(
  globalSelector,
  globalState => globalState.get('loggedIn')
);
