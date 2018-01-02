import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 40px 0;
  border: 1px solid #ddd;
  border-width: 0 0 1px 0;
`;

export default () => (
  <Wrapper>
    <ul>
      <li>
        No runtime libraries. No magic. Simply precompile your way to clear
        React code.
      </li>
      <li>Easy syntax thats similar to HTML, supported by most IDEs.</li>
      <li>
        Clear separation of presentation and logic - almost zero HTML in
        component files.
      </li>
      <li>
        Declarative coding ensures that the HTML that you write and the HTML you
        inspect look nearly identical.
      </li>
      <li>
        Supports <a href="#amd">AMD</a>, <a href="#commonjs">CommonJS</a>,{' '}
        <a href="#es6">ES6</a>, Typescript and globals.
      </li>
    </ul>
  </Wrapper>
);
