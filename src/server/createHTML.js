/**
 * React component did not get the correct result when it injected
 * the style extracted from styled-components into the header, but
 * template string is works fine.
 */
/* eslint-disable indent */
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import { publicUrl, isDev } from './config';

/**
 * @param {Object} props
 * @return  {String} Pre-render html string
 */
export default function createHTML(props) {
  const {
    assets = {},
    preloadState = {},
    bundles = [],
    styles = '',
    content = '',
  } = props;
  const helmet = Helmet.renderStatic();
  const htmlAttrs = helmet.htmlAttributes.toString();
  const bodyAttrs = helmet.bodyAttributes.toString();
  const initialState = serialize(preloadState);
  return `
    <!doctype html>
    <html lang="en">
      <head ${htmlAttrs}>
        ${helmet.base.toString()}
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
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
        ${
          assets.vendor && assets.vendor.css
            ? `<link href="${assets.vendor.css}" rel="stylesheet" />`
            : ''
        }
        ${
          assets.main && assets.main.css
            ? `<link href="${assets.main.css}" rel="stylesheet" />`
            : ''
        }
        ${!isDev ? styles : ''}
        ${isDev ? '<style>#app{display:none}</style>' : ''}
      </head>
      <body ${bodyAttrs}>
        ${isDev ? styles : ''}
        <div id="app">${content}</div>
        ${`<script>window.__INITIAL_STATE__=${initialState};</script>`}
        ${__DLLS__ ? '<script src="/dll/vendor.dll.js"></script>' : ''}
        ${
          assets.manifest && assets.manifest.js
            ? `<script src="${assets.manifest.js}"></script>`
            : ''
        }
        ${
          assets.vendor && assets.vendor.js
            ? `<script src="${assets.vendor.js}"></script>`
            : ''
        }
        ${bundles
          .filter(bundle => bundle.file.endsWith('.js'))
          .map(bundle => `<script src="${publicUrl}/${bundle.file}"></script>`)
          .join('\n')}
        ${
          assets.main && assets.main.js
            ? `<script src="${assets.main.js}" /></script>`
            : ''
        }
        ${helmet.script.toString()}
        ${
          isDev
            ? '<script>document.getElementById("app").style.display="block";</script>'
            : ''
        }
      </body>
    </html>
  `;
}
