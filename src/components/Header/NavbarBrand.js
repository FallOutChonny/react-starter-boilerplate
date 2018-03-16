/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'react-router-dom/Link';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  text-decoration: none;
  color: #000;

  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const styles = { link: { textDecoration: 'none' } };

export default function NavbarBrand(props) {
  const { children, to } = props;
  return (
    <Link to={to} style={styles.link}>
      <Wrapper>{children}</Wrapper>
    </Link>
  );
}

NavbarBrand.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
};

NavbarBrand.defaultProps = { to: '/' };
