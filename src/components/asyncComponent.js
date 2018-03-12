/* eslint-disable react/prop-types */
import React from 'react';
import Loadable from 'react-loadable';
import getAsyncInjectors from 'utils/asyncInjectors';
import Loading from './Loading';

function asyncComponent(getRoute) {
  return Loadable({
    loader: getRoute,
    loading: Loading,
    render(loaded, props) {
      const { Component, name, reducer, saga } = loaded.default;

      if (props.store) {
        const { injectReducer, injectSaga } = getAsyncInjectors(props.store);

        if (reducer) {
          injectReducer(name, reducer);
        }

        if (saga) {
          injectSaga(name, saga);
        }
      }

      return <Component {...props} />;
    },
  });
}

export default asyncComponent;
