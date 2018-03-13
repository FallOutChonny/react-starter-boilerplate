import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Collapse,
  Container,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Button,
} from 'reactstrap';
import RRNavLink from 'react-router-dom/NavLink';
import { logout } from 'containers/App/reducer';
import { makeGetLoggedIn } from 'containers/App/selectors';
import Image from './Image';
import Span from './Span';
import logo from './logo.png';

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

  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggle = () => this.setState(state => ({ isOpen: !state.isOpen }));
  }

  onClickLogout = evt => {
    evt.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <Container>
          <NavbarBrand to="/" tag={RRNavLink}>
            <Image
              src={logo}
              alt="Start React"
              title="React Starter Boilerplate"
            />
            React Starter
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={RRNavLink} to="/about">
                  <Span>About</Span>
                </NavLink>
              </NavItem>
              {this.props.loggedIn && (
                <NavItem>
                  <NavLink tag={RRNavLink} to="/news">
                    <Span>News</Span>
                  </NavLink>
                </NavItem>
              )}
              {!this.props.loggedIn && (
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">
                    <Span>Login</Span>
                  </NavLink>
                </NavItem>
              )}
              {this.props.loggedIn && (
                <NavItem>
                  <Button color="primary" outline onClick={this.onClickLogout}>
                    LOGOUT
                  </Button>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
