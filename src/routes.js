/**
 * Shared routes for both client-side and server-side.
 */
import React from 'react';
import App from './containers/App';
import About from './containers/About';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import NotFound from './containers/NotFound';

export default function createRoutes(store) {
  // Pass redux store into props, so that we can use the async reducer or sagas
  const withStore = Route => props => <Route {...props} store={store} />;
  // Sort routes by alphabetical order, keep it easy to read.
  return [
    {
      component: App,
      routes: [
        { path: '/', exact: true, component: Home },
        { path: '/about', component: About },
        { path: '/login', component: withStore(Login) },
        { path: '/register', component: withStore(Register) },
        // { path: '/news', component: null },

        // NOTE: put NotFound on the last.
        { component: NotFound },
      ],
    },
  ];
}
