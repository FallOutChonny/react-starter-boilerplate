import express from 'express';
import path from 'path';
import http from 'http';
import compression from 'compression';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import createHistory from 'history/createMemoryHistory';
import renderRoutes from 'react-router-config/renderRoutes';
import matchRoutes from 'react-router-config/matchRoutes';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import configureStore from '../configureStore';
import waitAll from './waitAll';
import waitChunks from './waitChunks';
import Html from './Html';
import createRoutes from '../routes';
import { port, host } from '../config';

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const app = express();
const server = new http.Server(app);
// Store loadable-chunks object
let stats = [];

app.use(compression());

// Serve static assets
app.use(
  express.static(path.resolve(process.cwd(), 'build'), {
    maxAge: 86400000 * 7,
  })
);

app.use(helmet());
app.use(favicon(path.join(process.cwd(), '/public/favicon.ico')));

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const history = createHistory(req.originalUrl);
  const store = configureStore(history);
  const routes = createRoutes(store);

  function renderAppHtml() {
    res.write('<!doctype html>');
    ReactDOM.renderToNodeStream(
      <Html assets={webpackIsomorphicTools.assets()} />
    ).pipe(res);
  }

  if (__DISABLE_SSR__) {
    renderAppHtml();
    return;
  }

  const preLoaders = matchRoutes(routes, req.url)
    .filter(({ route }) => route.component && route.component.preLoad)
    .map(({ route, match }) => route.component.preLoad(match, req))
    .reduce((result, preLoader) => result.concat(preLoader), []);

  const runTasks = store.runSaga(waitAll(preLoaders));
  runTasks.done.then(() => {
    const routerContext = {};
    const modules = [];
    const sheet = new ServerStyleSheet();
    const component = (
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <StyleSheetManager sheet={sheet.instance}>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <StaticRouter location={req.url} context={routerContext}>
                {renderRoutes(routes)}
              </StaticRouter>
            </ConnectedRouter>
          </Provider>
        </StyleSheetManager>
      </Loadable.Capture>
    );

    if (routerContext.url) {
      res.redirect(routerContext.status || 302, routerContext.url);
    }

    const content = ReactDOM.renderToString(component);
    const styleTags = sheet.getStyleTags();
    const bundles = getBundles(stats, modules);
    const html = `<!doctype html>${ReactDOM.renderToStaticMarkup(
      <Html
        content={content}
        preloadState={store.getState()}
        assets={webpackIsomorphicTools.assets()}
        bundles={bundles}
        styleTags={styleTags}
      />
    )}`;

    res.status(routerContext.status || 200).send(html);
  });
});

(async () => {
  if (port) {
    await Loadable.preloadAll();
    stats = await waitChunks();

    server.listen(port, host, err => {
      if (err) {
        console.error(err);
      }
      // console.info(
      //   '==> 💻  Open http://%s:%s in a browser to view the app.',
      //   host,
      //   port
      // );
      // openBrowser(`http://${host}:${port}`);
    });
  } else {
    console.error(
      '==>     ERROR: No PORT environment variable has been specified'
    );
  }
})();
