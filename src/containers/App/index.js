import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { hot } from 'react-hot-loader';
import renderRoutes from 'react-router-config/renderRoutes';
import { ThemeProvider } from 'styled-components';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ErrorBoundary from './ErrorBoundary';
import theme from './theme';

class App extends React.PureComponent {
  static propTypes = {
    route: PropTypes.shape({ routes: PropTypes.array }).isRequired,
  };

  render() {
    const { route } = this.props;
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
            <Header />
            {renderRoutes(route.routes)}
            <Footer />
          </div>
        </ErrorBoundary>
      </ThemeProvider>
    );
  }
}

export default hot(module)(App);
