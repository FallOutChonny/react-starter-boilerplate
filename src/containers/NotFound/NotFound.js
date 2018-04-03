import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet-async';
import H1 from './H1';
import H2 from './H2';
import P from './P';

const NotFoundWrapper = styled.div`
  margin-bottom: 10%;
`;

export default function NotFound() {
  return (
    <NotFoundWrapper>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <section>
        <div>
          <H1>
            <span>
              <strong>4</strong>
            </span>
            <span>
              <strong>0</strong>
            </span>
            <span>
              <strong>4</strong>
            </span>
          </H1>
          <H2>
            Error ! <span>Page Not Found</span>
          </H2>
        </div>
        <P>
          For Some Reason The Page You Requested Could Not Be Found On Our
          Server
        </P>
      </section>
    </NotFoundWrapper>
  );
}
