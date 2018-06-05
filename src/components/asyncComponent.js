/* eslint-disable react/prop-types */
import React from 'react';
import Loadable from 'react-loadable';
import getAsyncInjectors from 'utils/asyncInjectors';
import Loading from './Loading';

/* prettier-ignore */
const asyncComponent = getRoute => Loadable({
  loader: getRoute,
  loading: Loading,
  render(loaded, props) {
    const { Component, key, reducer, saga } = loaded.default;

    if (props.store) {
      const { injectReducer, injectSaga } = getAsyncInjectors(props.store);

      if (reducer) {
        injectReducer(key, reducer);
      }

      if (saga) {
        injectSaga(key, saga);
      }
    }

    return <Component {...props} />;
  },
});

export default asyncComponent;
