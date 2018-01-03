/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import config from '../config';

class Html extends React.PureComponent {
  render() {
    const { assets, content, preloadState, bundles, styleTags } = this.props;
    const head = Helmet.rewind();
    return (
      <html lang="en">
        <head>
          {head.base.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="TibaMe" />
          <meta name="theme-color" content="#ffffff" />
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {assets.styles &&
            Object.keys(assets.styles).map(style => (
              <link
                href={assets.styles[style]}
                media="screen, projection"
                rel="stylesheet"
                type="text/css"
              />
            ))}
          {/* (will be present only in development mode) */}
          {assets.styles && Object.keys(assets.styles).length === 0 ? (
            <style dangerouslySetInnerHTML={{ __html: '#app{display:none}' }} />
          ) : null}
          {styleTags}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__PRELOADED_STATE__=${serialize(preloadState)};`,
            }}
          />
          {__DLLS__ && <script src="/dll/vendor.dll.js" />}
          {assets.javascript && <script src={assets.javascript.vendor} />}
          {assets.javascript && <script src={assets.javascript.main} />}
          {bundles.map(bundle => (
            <script
              src={`${config.publicUrl}/${bundle.file}`}
              key={bundle.id}
            />
          ))}
          {/* (will be present only in development mode) */}
          {assets.styles && Object.keys(assets.styles).length === 0 ? (
            <script
              dangerouslySetInnerHTML={{
                __html: 'document.getElementById("app").style.display="block";',
              }}
            />
          ) : null}
        </body>
      </html>
    );
  }
}

Html.propTypes = {
  assets: PropTypes.shape({
    styles: PropTypes.object,
    javascript: PropTypes.object,
  }),
  styleTags: PropTypes.node,
  bundles: PropTypes.arrayOf(PropTypes.object),
  content: PropTypes.string,
  preloadState: PropTypes.shape({
    route: PropTypes.object,
  }),
};

Html.defaultProps = {
  styleTags: '',
  assets: {},
  bundles: [],
  content: '',
  preloadState: {},
};

export default Html;
