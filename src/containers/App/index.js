import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { setConfig } from 'react-hot-loader';
import renderRoutes from 'react-router-config/renderRoutes';
import { ThemeProvider } from 'styled-components';
import Header from 'components/Header';
import Footer from 'components/Footer';
import theme from './theme';

// setConfig({ logLevel: 'debug' });

class App extends React.PureComponent {
  static propTypes = { route: PropTypes.shape({ routes: PropTypes.array }) };

  static defaultProps = { route: { routes: [] } };

  render() {
    const { route } = this.props;
    return (
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    );
  }
}

export default App;
// export default hot(module)(App);
