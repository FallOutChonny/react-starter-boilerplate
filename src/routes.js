import React from 'react';
import Route from 'react-router/Route';
import Router from 'react-router/Router';
import App from './components/App';

export default props => (
  <Router {...props}>
    <Route path="/" component={App} />
  </Router>
);
