/* eslint-disable no-param-reassign */
import conformsTo from 'lodash/conformsTo';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import invariant from 'invariant';
import createReducer from '../reducers';

// Default mode
const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
const allowedModes = [RESTART_ON_REMOUNT];

function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    asyncReducers: isObject,
  };
  invariant(
    conformsTo(store, shape),
    '(app/utils...) asyncInjectors: Expected a valid redux store'
  );
}

function checkDescriptor(descriptor) {
  const shape = {
    saga: isFunction,
    mode: mode => isString(mode) && allowedModes.includes(mode),
  };
  invariant(
    conformsTo(descriptor, shape),
    '(app/utils...) injectSaga: Expected a valid saga descriptor'
  );
}

function injectAsyncReducer(store, isValid) {
  return function injectReducer(key, reducer) {
    if (!isValid) checkStore(store);

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectAsyncReducer: Expected `asyncReducer` to be a reducer function'
    );

    if (Reflect.has(store.asyncReducers, key)) return;

    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

function injectAsyncSaga(store, isValid) {
  return function injectSaga(key, saga) {
    if (!isValid) checkStore(store);

    const newDescriptor = { saga, mode: RESTART_ON_REMOUNT };

    checkDescriptor(newDescriptor);

    let hasSaga = Reflect.has(store.asyncSagas, key);

    if (__DEV__) {
      const oldDescriptor = store.asyncSagas[key];
      // enable hot reloading
      if (hasSaga && oldDescriptor.saga !== newDescriptor.saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (!hasSaga) {
      store.asyncSagas[key] = {
        ...newDescriptor,
        task: store.runSaga(saga),
      };
    }
  };
}

export default function getAsyncInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectAsyncReducer(store, true),
    injectSaga: injectAsyncSaga(store, true),
  };
}
