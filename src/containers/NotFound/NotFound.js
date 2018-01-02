import React from 'react';
import styled from 'styled-components';
import Container from 'reactstrap/lib/Container';
import H1 from './H1';
import H2 from './H2';
import P from './P';

const NotFoundWrapper = styled.div`
  margin-bottom: 40%;
`;

export default function NotFound() {
  return (
    <NotFoundWrapper>
      <Container>
        <section id="fof">
          <div className="hgroup">
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
      </Container>
    </NotFoundWrapper>
  );
}
