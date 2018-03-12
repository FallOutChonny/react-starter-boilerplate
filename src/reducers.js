/**
 * The root reducer.
 */

import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { fromJS } from 'immutable';
import globalReducer from 'containers/App/reducer';

const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    global: globalReducer,
    // auth: () => ({}),
    ...asyncReducers,
  });
}
