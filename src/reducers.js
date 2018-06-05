/**
 * The root reducer.
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import globalReducer from 'containers/App/reducer';

export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routerReducer,
    global: globalReducer,
    // auth: () => ({}),
    ...asyncReducers,
  });
}
