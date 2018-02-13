import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const LinkButton = styled.a.attrs({
  className: 'btn btn-lg btn-secondary',
  role: 'button',
  href: 'https://github.com/FallOutChonny/react-starter-boilerplate',
})`
  border-width: 2px;
  background: 0 0;
  border-color: rgba(255, 255, 255, 0.8);
  font-size: 24px;
`;

export default function GithubButton() {
  return (
    <Wrapper>
      <LinkButton>Check Out on Github</LinkButton>
    </Wrapper>
  );
}
