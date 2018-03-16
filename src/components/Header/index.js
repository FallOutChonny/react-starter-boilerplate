/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { logout } from 'containers/App/reducer';
import { makeGetLoggedIn } from 'containers/App/selectors';
import Navbar from './Navbar';
import NavbarBrand from './NavbarBrand';
import Image from './Image';
import Span from './Span';
import logo from './logo.png';
import Link from '../Link';
import Button from '../Button';

const styles = {
  marginRight10: { marginRight: '10px' },
};

@connect(
  createStructuredSelector({
    loggedIn: makeGetLoggedIn(),
  }),
  {
    logout,
  }
)
class Header extends React.PureComponent {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    loggedIn: PropTypes.string,
  };

  static defaultProps = {
    loggedIn: '',
  };

  onClickLogout = evt => {
    evt.preventDefault();
    this.props.logout();
  };

  onClickLogin = evt => {
    evt.preventDefault();
    this.props.push('/login');
  };

  onClickRegister = evt => {
    evt.preventDefault();
    this.props.push('/register');
  };

  render() {
    const { loggedIn } = this.props;
    return (
      <Navbar>
        <NavbarBrand href="/">
          <Image
            src={logo}
            alt="Start React"
            title="React Starter Boilerplate"
          />
          React Starter
        </NavbarBrand>
        {loggedIn && (
          <div>
            <Link to="login" style={styles.marginRight10}>
              Users
            </Link>
            <Button
              size="sm"
              outline
              onClick={this.onClickLogout}
              style={styles.marginRight10}
            >
              Logout
            </Button>
          </div>
        )}
        {!loggedIn && (
          <div>
            <Button
              size="sm"
              outline
              onClick={this.onClickRegister}
              style={styles.marginRight10}
            >
              Register
            </Button>
            <Button
              size="sm"
              outline
              onClick={this.onClickLogin}
              style={styles.marginRight10}
            >
              Login
            </Button>
          </div>
        )}
      </Navbar>
    );
  }
}

export default Header;
