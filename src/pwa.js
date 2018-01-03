import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './server/Html';

export default function pwa() {
  return `<!doctype html>${ReactDOM.renderToStaticMarkup(<Html />)}`;
}
