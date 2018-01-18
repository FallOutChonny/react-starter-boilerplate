import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  opacity: 1;
  display: block;
  position: relative;

  &:after {
    content: '';
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.75);
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
  }

  &:hover:after {
    opacity: 1;
  }

  &:hover ul {
    opacity: 1;
  }

  &:after,
  ul,
  ul li {
    transition: all 0.5s ease-in-out 0s;
  }

  a {
    color: #fff;

    &:hover {
      text-decoration: none;
      color: #519548;
    }

    &:hover li {
      border-color: #fff;
      color: ${prop => prop.theme.brandPrimary};
    }
  }

  ul {
    position: absolute;
    z-index: 2;
    bottom: 50px;
    text-align: center;
    width: 100%;
    padding-left: 0px;
    height: 0px;
    margin: 0px;
    opacity: 0;

    a {
      transition: all 0.3s ease-in-out 0s;
    }

    i {
      font-size: 20px;
      letter-spacing: 10px;
    }

    li {
      width: 30px;
      height: 30px;
      text-align: center;
      border: ${prop => `1px solid ${prop.theme.brandPrimary}`};
      margin: 2px;
      padding: 5px;
      display: inline-block;
    }
  }
`;

function ImageBox(props) {
  const { avatar, facebook, twitter, linkedin } = props;
  return (
    <Wrapper>
      <img alt="profile" src={avatar} className="img-fluid" />
      <ul className="text-center">
        <a href={facebook}>
          <li>
            <i className="fa fa-facebook" />
          </li>
        </a>
        <a href={twitter}>
          <li>
            <i className="fa fa-twitter" />
          </li>
        </a>
        <a href={linkedin}>
          <li>
            <i className="fa fa-linkedin" />
          </li>
        </a>
      </ul>
    </Wrapper>
  );
}

ImageBox.propTypes = {
  facebook: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default ImageBox;
