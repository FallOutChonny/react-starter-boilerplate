import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

export const makeGetLoggedIn = () =>
  createSelector(selectGlobal, globalState => globalState.get('loggedIn'));
