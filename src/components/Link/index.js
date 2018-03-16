import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';

const Span = styled.span`
  color: ${props => props.theme.secondary};

  &:hover {
    color: ${props => props.theme.primary}
    border-bottom: 1px solid ${props => props.theme.primary}
  }
`;

const styles = {
  textDecoration: 'none',
};

export default class Button extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    className: PropTypes.string,
    style: PropTypes.object, // eslint-disable-line
  };

  static defaultProps = {
    to: '/',
    className: '',
    style: {},
  };

  render() {
    const { children, to, className, style, ...rest } = this.props;
    return (
      <Link
        to={to}
        className={className}
        style={{ ...styles, ...style }}
        {...rest}
      >
        <Span>{children}</Span>
      </Link>
    );
  }
}
