const ExtractTextPlugin = require('extract-text-webpack-plugin');

const fontAwesomeConfig = {
  styles: {
    mixins: true,
    core: true,
    icons: true,
    larger: true,
    path: true,
    stacked: true,
  },
};

function encodeLoader(loader) {
  if (typeof loader === 'string') {
    return loader;
  }

  if (typeof loader.options !== 'undefined') {
    const query = Object.keys(loader.options)
      .map(function map(param) {
        return `${encodeURIComponent(
          param
        )}=${encodeURIComponent(loader.options[param])}`;
      })
      .join('&');
    return `${loader.loader}?${query}`;
  }
  return loader.loader;
}

function buildExtractStylesLoader(loaders) {
  const extractTextLoader = encodeLoader(loaders[0]);
  const fallbackLoader = encodeLoader(loaders[1]);

  const restLoaders = loaders.slice(2).map(function map(loader) {
    if (typeof loader === 'string') {
      return loader;
    }
    return encodeLoader(loader);
  });

  return [
    extractTextLoader,
    fallbackLoader,
    // ...restLoaders,
  ]
    .concat(restLoaders)
    .join('!');
}

if (process.env.NODE_ENV === 'production') {
  fontAwesomeConfig.styleLoader = buildExtractStylesLoader(
    ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'less-loader'],
    })
  );
}

module.exports = fontAwesomeConfig;
