import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  body {
    font-family: 'PT Sans', Helvetica, Arial, sans-serif;
    background: #f7f8fa;
  }

  body.fontLoaded {
    font-family: 'PT Sans', Helvetica, Arial, sans-serif;
  }
`;
