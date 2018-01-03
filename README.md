# React Starter Boilerplate

A starter kit for universal react app, this project is extends from ejected create-react-app

## Features

I put these popular react/redux ecosystem libraries together and already set up.

* immutable.js
* react
* reacy-loadable
* react-helmet
* react-router
* react-router-redux
* reselect
* reactstrap
* redux
* redux-saga
* styled-components
* bootstrap v4
* font-awesome

## Better Developer Expreience

Integrated some packages and tools that can reduce webpack initial/rebuild time, hot-reload both on client and server side, and help you debugging application.

* webpack-DLL-plugin
* cache-loader
* happypack
* react-hot-loader
* redux-devtools
* webpack-bundle-analyzer
* Prettier and ESLint integrated

You can also install [react-tools](https://github.com/facebook/react-devtools), this is a browser extension made by facebook.

## Production Ready

* split vendor libraries from app code
* offline support
* route and component based code splitting
* async inject reducer and saga
* Long-term caching

## SEO Friendly

It's a universal project, so web content can crawlable, and we use `react-helmet` inject meta tags into html head dynamically.

## Supported Language Features

This project supports [ES6](https://github.com/lukehoban/es6features) syntax features and it also supports:

* Async/await.
* Dynamic import()
* Static Properties.
* Class Decorator.
* JSX and Flow syntax.

Learn more about [different proposal stages](https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-).

## Getting Started

First, install the node modules

```bash
npm install
```

or you can run `yarn install`

Then, run the following command, this will run the app in the development mode.

```bash
npm run dev
```

and you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

In the project directory, you can also run:

### `npm run build:dll`

Generate a DLL file stored in build/dll folder, this file bundles all of the third-party packages like react, redux, styled-components etc, so we don't need rebuild these module in dev, it will save a lot of webpack rebuild time that increase development efficiency

### `npm run analyze`

Generate stats.json and report.html in build folder, you can upload stats.json file on [webpack.github.io/analyse/#hints](http://webpack.github.io/analyse/#hints) or open `report.html` see bundle content

### `npm run flow`

Run the static type checker [flow checkers](https://flow.org/en/) to check your program.

### `npm run test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`

Run ESLint (code quality tool) that checks for problems in your app code.

## Road map

* Write README
* Write examples
* Write unit test for react components, reducers and sagas
* preact on production
* Rewrite SSR code
