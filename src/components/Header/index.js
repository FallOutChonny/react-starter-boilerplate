import React from 'react';
import Collapse from 'reactstrap/lib/Collapse';
import Container from 'reactstrap/lib/Container';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import Navbar from 'reactstrap/lib/Navbar';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';
import NavbarToggler from 'reactstrap/lib/NavbarToggler';
import RRNavLink from 'react-router-dom/NavLink';
import Image from './Image';
import Span from './Span';
import logo from './logo.png';

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggle = () => this.setState(state => ({ isOpen: !state.isOpen }));
  }

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
              <NavItem>
                <NavLink tag={RRNavLink} to="/news">
                  <Span>News</Span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/login">
                  <Span>Login</Span>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
