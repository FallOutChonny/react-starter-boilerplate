/**
 * NOTE: An example that integrated redux with local form state.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import Helmet from 'react-helmet-async';
import LoginForm from 'components/Form';
import saga from './saga';
import { reducer, login, changeForm } from './reducer';
import { makeGetError, makeGetForm, makeGetLoading } from './selectors';

class Login extends React.PureComponent {
  static propTypes = {
    onSubmitForm: PropTypes.func.isRequired,
    onChangeForm: PropTypes.func.isRequired,
    formState: PropTypes.shape({
      username: PropTypes.string,
      password: PropTypes.string,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
  };

  render() {
    const {
      onChangeForm,
      onSubmitForm,
      formState,
      loading,
      ...rest
    } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>Login Page</title>
        </Helmet>
        <LoginForm
          formName="Login"
          formState={formState}
          onSubmitForm={onSubmitForm}
          onChangeForm={onChangeForm}
          loading={loading}
          {...rest}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  formState: makeGetForm(),
  error: makeGetError(),
  loading: makeGetLoading(),
});

const mapDispatchToProps = dispatch => ({
  onChangeForm: data => dispatch(changeForm(data)),
  onSubmitForm: evt => {
    if (evt && evt.preventDefault) {
      evt.preventDefault();
    }
    dispatch(login());
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const ComposedComponent = compose(hot(module), withConnect)(Login);

export default {
  name: 'login', // the async reducer/saga name
  Component: ComposedComponent,
  reducer,
  saga,
};
