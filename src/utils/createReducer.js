/* eslint-disable no-prototype-builtins */

/**
 * Flux standard reducer
 * @param {Object} initialState
 * @param {Object} handlers
 */
export default function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}
