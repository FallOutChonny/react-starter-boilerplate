/**
 * Generates html file with the <script> injected.
 * This file will be used by HtmlWebpackPlugin in webpack.config.
 */
const createHTML = require('../src/server/createHTML').default;

module.exports = () => createHTML({});
