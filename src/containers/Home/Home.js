import React from 'react';
import { Container } from 'reactstrap';
import { hot } from 'react-hot-loader';
import Hero from './Hero';
import PageTitle from './PageTitle';
import SubTitle from './SubTitle';
import GithubButton from './GithubButton';
import Features from './Features';
import Line from './Line';

function Home() {
  return (
    <div>
      <Hero>
        <PageTitle>React starter boilerplate</PageTitle>
        <SubTitle>
          A Starter Kit for Universal React App, Your website is ready.
        </SubTitle>
        <GithubButton />
      </Hero>
      <Container>
        <Line title="Features" />
        <Features />
      </Container>
    </div>
  );
}

export default hot(module)(Home);
