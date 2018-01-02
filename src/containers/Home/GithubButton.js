import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const Button = styled.button.attrs({
  className: 'btn btn-lg btn-secondary',
})`
  border-width: 2px;
  background: 0 0;
  border-color: rgba(255, 255, 255, 0.8) !important;
  font-size: 24px;
`;

export default () => (
  <Wrapper>
    <Button>Check Out on Github</Button>
  </Wrapper>
);
