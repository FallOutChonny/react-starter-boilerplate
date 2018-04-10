/**
 * Generates html file with the <script> injected.
 * This file will be used by HtmlWebpackPlugin in webpack.config.
 */
const createHTML = require('../src/server/createHTML').default;

const helmetContext = {
  helmet: {
    htmlAttributes: {},
    bodyAttributes: {},
    title: {},
    base: {},
    meta: {},
    link: {},
    script: {},
  },
};

const { html } = createHTML({ helmetContext });

module.exports = () => html;
