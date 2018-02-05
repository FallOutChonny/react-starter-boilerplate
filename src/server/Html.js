/* eslint-disable react/no-danger, object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import { publicUrl } from '../config';

class Html extends React.PureComponent {
  render() {
    const { assets, content, preloadState, bundles, styleTags } = this.props;
    const head = Helmet.renderStatic();
    return (
      <html lang="en">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta
            name="apple-mobile-web-app-title"
            content="react-starter-boilerplate"
          />
          <meta name="theme-color" content="#ffffff" />
          {assets.vendor ? (
            <link href={assets.vendor.css} rel="stylesheet" />
          ) : (
            ''
          )}
          {assets.main ? <link href={assets.main.css} rel="stylesheet" /> : ''}
          {!__DEVELOPMENT__ ? styleTags : null}
          {assets.main && !assets.main.css ? (
            <style dangerouslySetInnerHTML={{ __html: '#app{display:none}' }} />
          ) : null}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__PRELOADED_STATE__=${serialize(preloadState)};`,
            }}
          />
          {__DLLS__ && <script src="/dll/vendor.dll.js" />}
          {assets.vendor && <script src={assets.vendor.js} />}
          {assets.main && <script src={assets.main.js} />}
          {bundles.map(x => (
            <script key={x.id} src={`${publicUrl}/${x.file}`} />
          ))}
          {assets.main && !assets.main.css ? (
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
    vendor: PropTypes.object,
    main: PropTypes.object,
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
