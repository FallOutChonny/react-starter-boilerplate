import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

export default class extends React.PureComponent {
  static displayName = 'FormBody';

  static propTypes = {
    data: PropTypes.shape({
      username: PropTypes.string,
      password: PropTypes.string,
    }).isRequired,
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static defaultProps = {
    error: null,
  };

  onChangeUsername = evt => {
    evt.preventDefault();
    const { data: { password } } = this.props;
    this.props.onChange({ password, username: evt.target.value });
  };

  onChangePassword = evt => {
    evt.preventDefault();
    const { data: { username } } = this.props;
    this.props.onChange({ username, password: evt.target.value });
  };

  handleClickCreateAccount = e => {
    e.preventDefault();
    this.props.history.push('/register');
  };

  render() {
    const {
      data: { username, password },
      name,
      onSubmit,
      error,
      loading,
    } = this.props;

    return (
      <Form onSubmit={onSubmit}>
        {error && <Alert color="danger">{error}</Alert>}
        <FormGroup>
          <Label for="email" className="w-100">
            E-Mail Address
          </Label>
          <Input
            type="email"
            name="email"
            value={username || ''}
            onChange={this.onChangeUsername}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password" className="w-100">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            value={password || ''}
            onChange={this.onChangePassword}
          />
        </FormGroup>
        <FormGroup className="no-margin">
          <Button color="primary" block>
            {name} {loading && <i className="fa fa-spin fa-circle-o-notch" />}
          </Button>
        </FormGroup>
        {name === 'Login' && (
          <div className="margin-top20 text-center">
            Dont have an account?{' '}
            <Button color="link" onClick={this.handleClickCreateAccount}>
              Create One
            </Button>
          </div>
        )}
      </Form>
    );
  }
}
