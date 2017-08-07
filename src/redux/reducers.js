import { combineReducers } from 'redux';

const appReduer = combineReducers({
  online: (state = true) => state,
});

const rootReducer = (state, action) => appReduer(state, action);

export default rootReducer;
