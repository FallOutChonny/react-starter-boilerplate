/**
 * React component did not get the correct result when it injected
 * the style extracted from styled-components into the header, but
 * template string is works fine.
 */
/* eslint-disable indent */
import serialize from 'serialize-javascript';
import { html } from 'common-tags';
import { publicUrl, isDev } from './config';

export default function createHTML({
  // Webpack bundled assets such as javascript, css.
  assets = {},
  // Server-side preloaded redux state
  preloadState = {},
  // React-loadable chunks that are on the request page.
  bundles = [],
  // React-helmet-async context.
  helmetContext = {},
  // All the styles required for displaying icons at the correct size.
  faStyles,
}) {
  const { helmet } = helmetContext;
  const htmlAttrs = helmet.htmlAttributes.toString();
  const bodyAttrs = helmet.bodyAttributes.toString();
  const initialState = serialize(preloadState);

  const header = html`
    <!DOCTYPE html>
    <html>
      <head ${htmlAttrs}>
        <meta charset="utf-8" />
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
          assets.main && assets.main.css
            ? `<link href="${assets.main.css}" rel="stylesheet" />`
            : ''
        }
        ${faStyles ? `<style>${faStyles}</style>` : ''}
        ${isDev ? '<style>#app{display:none}</style>' : ''}
      </head>
      <body ${bodyAttrs}>
        <div id="app">`;

  const footer = html`</div>
      <script>window.__INITIAL_STATE__=${initialState};</script>
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

  return {
    header,
    footer,
    html: `${header}${footer}`,
  };
}
