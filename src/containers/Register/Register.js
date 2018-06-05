/**
 * NOTE: An example that using local state to stored form state.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import Helmet from 'react-helmet-async';
import RegisterForm from 'components/Form';
import saga from './saga';
import { reducer, register } from './reducer';
import { makeGetError, makeGetLoading } from './selectors';

class Register extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  state = { formState: { username: '', password: '' } };

  onChangeForm = formState => this.setState({ formState });

  onSubmitForm = evt => {
    if (evt && evt.preventDefault) {
      evt.preventDefault();
    }
    this.props.register(this.state.formState);
  };

  render() {
    const { loading, ...rest } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>Register Page</title>
        </Helmet>
        <RegisterForm
          onChangeForm={this.onChangeForm}
          onSubmitForm={this.onSubmitForm}
          formName="Register"
          formState={this.state.formState}
          loading={loading}
          {...rest}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  error: makeGetError(),
  loading: makeGetLoading(),
});
const mapDispatchToProps = { register };

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const ComposedComponent = compose(hot(module), withConnect)(Register);

export default {
  key: 'register',
  Component: ComposedComponent,
  reducer,
  saga,
};
