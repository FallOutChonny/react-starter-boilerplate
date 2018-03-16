import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

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
      <form onSubmit={onSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group">
          <label htmlFor="email">
            E-Mail Address
            <input
              type="email"
              name="email"
              value={username || ''}
              onChange={this.onChangeUsername}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              value={password || ''}
              onChange={this.onChangePassword}
            />
          </label>
        </div>
        <div className="form-group ">
          <Button color="primary" block>
            {name} {loading && <i className="fa fa-spin fa-circle-o-notch" />}
          </Button>
        </div>
        {name === 'Login' && (
          <div className="margin-top20 text-center">
            Dont have an account?{' '}
            <Button color="link" onClick={this.handleClickCreateAccount}>
              Create One
            </Button>
          </div>
        )}
      </form>
    );
  }
}
