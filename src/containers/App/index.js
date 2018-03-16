import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { hot } from 'react-hot-loader';
import renderRoutes from 'react-router-config/renderRoutes';
import styled, { ThemeProvider } from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';
import { loadAuthIfNeed } from './saga';
import theme from './theme';

const Wrapper = styled.div`
  padding-top: 90px;
`;

class App extends React.PureComponent {
  static propTypes = {
    route: PropTypes.shape({ routes: PropTypes.array }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  };

  static preLoad = () => [[loadAuthIfNeed]];

  render() {
    const { route, history } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <div>
            <Helmet
              titleTemplate="%s - React Starter Boilerplate"
              defaultTitle="React Starter Boilerplate"
            >
              <meta
                name="description"
                content="A starter kit for universal react app"
              />
              <meta name="og:title" content="React Starter Boilerplate" />
              <meta
                name="og:description"
                content="A starter kit for universal react app"
              />
            </Helmet>
            <Header push={history.push} />
            <Wrapper>{renderRoutes(route.routes)}</Wrapper>
            <Footer />
          </div>
        </ErrorBoundary>
      </ThemeProvider>
    );
  }
}

export default hot(module)(App);
