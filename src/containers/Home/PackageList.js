import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 40px 0;
  border: 1px solid #ddd;
  border-width: 0 0 1px 0;
`;

export default () => (
  <Wrapper>
    <h3>Best DX (developer Experience)</h3>
    <ul>
      <li>
        Hot-reload both on client-side and server-side, and interagte
        redux-devtools/extension for dev.
      </li>
      <li>
        Use happypack, webpack DLL plugin and cache-loader to reduce webpack
        initial/rebuild time.
      </li>
      <li>
        Already setup long-term caching on production, you dont worry about it.
      </li>
      <li>
        Integrated popular react/redux libraries, such as react-router,
        redux-saga, reselect, react-loadable, immutablejs
      </li>
      <li>
        Integrated bootstrap v4 and font-awesome, easy start layout your page.
      </li>
      <li>
        Prettier and ESLint integrated, make sure project keep Consistently,
        high quality code and reduce stupid bugs (ex typo).
      </li>
    </ul>
  </Wrapper>
);
