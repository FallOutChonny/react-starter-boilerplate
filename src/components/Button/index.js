/* eslint-disable no-confusing-arrow, no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Base = styled.button`
  display: ${props => (props.block ? 'block' : 'inline-block')};
  width: ${props => (props.block ? '100%' : 'auto')};
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: ${props =>
    props.size === 'sm' ? '.25rem .5rem' : '0.375rem 0.75rem'};
  font-size: ${props => (props.size === 'sm' ? '.875rem' : '1rem')};
  cursor: pointer;
  line-height: 1.5;
  border-radius: ${props => (props.size === 'sm' ? '.2rem' : '0.25rem')};
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  outline: 0;
`;

const primary = Base.extend`
  color: ${props => (props.outline ? props.theme.primary : '#fff')};
  background-color: ${props =>
    props.outline ? 'transparent' : props.theme.primary};
  border-color: ${props => props.theme.primary};

  &:hover {
    color: #fff;
    background-color: ${props =>
      props.outline ? props.theme.primary : '#0069d9'};
    border-color: ${props => (props.outline ? props.theme.primary : '#0062cc')};
  }
`;

const success = Base.extend`
  color: color: ${props => (props.outline ? props.theme.success : '#fff')};
  background-color: ${props =>
    props.outline ? 'transparent' : props.theme.success};
  border-color: ${props => props.theme.success};

  &:hover {
    color: #fff;
    background-color: ${props =>
      props.outline ? props.theme.success : '#218838'};
    border-color: ${props => (props.outline ? props.theme.success : '#1e7e34')};
  }
`;

const danger = Base.extend`
  color: color: ${props => (props.outline ? props.theme.danger : '#fff')};
  background-color: ${props =>
    props.outline ? 'transparent' : props.theme.danger};
  border-color: ${props => props.theme.danger};

  &:hover {
    color: #212529;
    background-color: ${props =>
      props.outline ? props.theme.danger : '#c82333'};
    border-color: ${props => (props.outline ? props.theme.danger : '#bd2130')};
  }
`;

const link = Base.extend`
  color: ${props => props.theme.link};
  background-color: transparent;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
    background-color: transparent;
    border-color: transparent;
  }

  &:focus {
    outline: 0;
    box-shadow: none;
    border-color: transparent;
  }
`;

const Buttons = {
  primary,
  success,
  danger,
  link,
};

export default function Button(props) {
  const StyledButton = Buttons[props.color];
  return <StyledButton {...props} />;
}

Button.propTypes = {
  color: PropTypes.string,
};

Button.defaultProps = {
  color: 'primary',
};
