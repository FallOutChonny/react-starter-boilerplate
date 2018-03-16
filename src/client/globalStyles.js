import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  #app {
    max-width: calc(768px + 32px);
    margin: 0 auto;
    display: flex;
    height: 100%;
    padding: 0 16px;
  }

  body {
    font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
    background: #fafafa;
  }

  body.fontLoaded {
    font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
  }
`;
