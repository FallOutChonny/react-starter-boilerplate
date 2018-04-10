import React from 'react';
import { hot } from 'react-hot-loader';
import Helmet from 'react-helmet-async';
import Intro from './Intro';
import P from './P';

function Home() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="React Starter Boilerplate homepage" />
      </Helmet>
      <Intro>
        <h1>React Starter Boilerplate</h1>
        <P>
          A starter kit for universal react app, this project is extends from
          ejected create-react-app, that has rich features and focus on
          performance: SEO-Ready, Production-Ready, SSR, Hot-Reload, CSS-in-JS,
          Code Splitting, Long-term Caching and more...
          <a href="https://github.com/FallOutChonny/react-starter-boilerplate">
            Check out on Github
          </a>
        </P>
      </Intro>
    </React.Fragment>
  );
}

export default hot(module)(Home);
