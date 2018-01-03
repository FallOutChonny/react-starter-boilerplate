/* eslint-disable no-confusing-arrow */

const identity = value => value;

/**
 * Flux standard action
 * @param {String} type - action constant
 * @param {Object} payloadCreator - payload object
 */
export default function createAction(type, payloadCreator = identity) {
  const finalPayloadCreator =
    payloadCreator === null || payloadCreator === identity
      ? identity
      : (head, ...args) =>
          head instanceof Error ? head : payloadCreator(head, ...args);

  const typeString = type.toString();

  const actionCreator = (...args) => {
    const payload = finalPayloadCreator(...args);
    const action = { type };

    if (payload instanceof Error) {
      action.error = true;
    }

    if (payload !== undefined) {
      action.payload = payload;
    }

    return action;
  };

  actionCreator.toString = () => typeString;

  return actionCreator;
}
