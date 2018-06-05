import express from 'express';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import React from 'react';
import { renderToNodeStream, renderToString } from 'react-dom/server'; // eslint-disable-line
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import createHistory from 'history/createMemoryHistory';
import renderRoutes from 'react-router-config/renderRoutes';
import matchRoutes from 'react-router-config/matchRoutes';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ServerStyleSheet } from 'styled-components';
import { isDev } from './config';
import waitAll from './waitAll';
import ssrCache from './ssrCache';
import createHTML from './createHTML';
import createCacheStream from './createCacheStream';
import fontawesome from '../utils/font-awesome';
import cookies from '../utils/cookies';
import configureStore from '../configureStore';
import createRoutes from '../routes';

/* eslint-disable import/no-dynamic-require */
const stats = require(process.env.LOADABLE_CHUNKS);
const assets = require(process.env.ASSETS_MANIFEST);

const app = express();

app.use(compression());

// Serve static assets
app.use(
  express.static(path.resolve(process.cwd(), 'build'), {
    // index: false,
    maxAge: 86400000 * 7,
    // setHeaders: res => {
    //   if (path.indexOf('service-worker.js')) {
    //     res.setHeader('Cache-Control', 'no-store');
    //     // return;
    //   }
    // },
  })
);

// app.disable('x-powered-by');
app.use(helmet());
app.use(favicon(path.join(process.cwd(), '/public/favicon.ico')));

app.use('*', (req, res, next) => {
  const key = `${req.url}`;

  if (!isDev && ssrCache.has(key)) {
    // Return the HTML for this path from the cache if it exists
    res.append('X-Cache', 'HIT');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(ssrCache.get(key));
    return;
  }
  // Otherwise go on and render it
  next();
});

app.use('*', (req, res) => {
  cookies.setRawCookies(req.headers.cookie);

  const history = createHistory(req.originalUrl);
  const store = configureStore(history);
  const routes = createRoutes(store);

  const preLoaders = matchRoutes(routes, req.url)
    .filter(({ route }) => route.component && route.component.preLoad)
    .map(({ route, match }) => route.component.preLoad(match, req))
    .reduce((result, preLoader) => result.concat(preLoader), []);

  const runTasks = store.runSaga(waitAll(preLoaders));
  runTasks.done.then(() => {
    const sheet = new ServerStyleSheet();
    const routerContext = {};
    const helmetContext = {};
    const modules = [];

    const component = (
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <HelmetProvider context={helmetContext}>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <StaticRouter location={req.url} context={routerContext}>
                {renderRoutes(routes)}
              </StaticRouter>
            </ConnectedRouter>
          </Provider>
        </HelmetProvider>
      </Loadable.Capture>
    );

    // get helmet and bundles...
    renderToString(component);

    if (routerContext.url) {
      res.redirect(routerContext.status || 302, routerContext.url);
    }

    const bundles = getBundles(stats, modules);
    const jsx = sheet.collectStyles(component);
    const faStyles = fontawesome.dom.css();
    const preloadState = store.getState();

    const { header, footer } = createHTML({
      assets,
      preloadState,
      bundles,
      helmetContext,
      faStyles,
    });

    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    let cacheStream;
    // Disable caching in development environment.
    if (!isDev) {
      // Create the cache stream and pipe it into the response
      cacheStream = createCacheStream(req.url);
      cacheStream.pipe(res);
    } else {
      cacheStream = res;
    }

    cacheStream.write(header);
    const renderStream = sheet.interleaveWithNodeStream(
      renderToNodeStream(jsx)
    );
    renderStream.pipe(cacheStream, { end: false });
    renderStream.on('end', () => {
      // Once it's done rendering write the rest of the HTML
      cacheStream.end(footer);
    });
  });
});

export default app;
