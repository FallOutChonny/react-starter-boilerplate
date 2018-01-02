import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  font-size: 0;
  text-align: center;
  height: 24px;
  margin: auto;
  /* margin-top: 2%; */
  margin-bottom: 2.3%;
  width: 50%;
  padding: 2px 0;
  overflow: hidden;
  clear: both;
`;

const HR = styled.span`
  &:before,
  &:after {
    display: inline-block;
    content: '';
    height: 1px;
    width: 50%;
    margin-top: 9px;
    vertical-align: top;
    position: relative;
    background-color: #e4e4e4;
  }

  &:before {
    left: -13px;
    margin-left: -50%;
  }

  &:after {
    left: 13px;
    margin-right: -50%;
  }
`;

const I = styled.i`
  font-size: 16px;
  line-height: 20px;
  height: 20px;
  width: 20px;
  vertical-align: top;
  text-align: center;
  color: #e4e4e4;
`;

const H2 = styled.h2`
  text-align: center;
  margin-top: 25px;
  margin-bottom: 10px;
  font-weight: 600;
`;

export default function Line({ title }) {
  return (
    <div>
      <H2 className="text-center">{title}</H2>
      <Container>
        <HR>
          <I className="fa fa-star" />
          <I className="fa fa-star" />
          <I className="fa fa-star" />
        </HR>
      </Container>
    </div>
  );
}

Line.propTypes = { title: PropTypes.string };
Line.defaultProps = { title: '' };
