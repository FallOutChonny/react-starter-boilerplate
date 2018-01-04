# React Starter Boilerplate

A starter kit for universal react app, this project is extends from ejected create-react-app

## Features

I put these popular and widely used react/redux ecosystem libraries together and already set up in this project.

* `react` as the view.
* `react-router` v4 as the router.
* `react-loadable` provides component based code splitting
* `react-helmet` provides control of the page head from within components.
* `redux` as the state management container
* `redux-saga` deal with asynchronous action flow.
* `react-router-redux` sync your router with redux state
* `reselect` to avoid frequent re-render.
* `reactstrap` react bootstrap 4 components.
* `immutable.js` provides many persistent Immutable data structures.
* `styled-components` helps you organize CSS in react project.
* `bootstrap` v4 for building responsive, mobile-first pages.
* `font-awesome` as the Icons

## Better Developer Expreience

Integrated some packages and tools that can reduce webpack initial/rebuild time, hot-reload both on client and server side, and help you debugging application.

* webpack-DLL-plugin
* cache-loader
* happypack
* react-hot-loader
* redux-devtools
* webpack-bundle-analyzer
* Prettier and ESLint integrated

You can also install [react-devtools](https://github.com/facebook/react-devtools), this is a browser extension made by facebook.

## Production Ready

* Split vendor libraries from app code.
* Route and component based code splitting.
* Async inject reducer and saga.
* Offline support via service-worker.
* Long-term browser caching support.

## SEO Friendly

This project is using Server-side rendering, so web content can be crawlable, and we use `react-helmet` to inject meta tags into html head dynamically, so social media like G+, facebook can know your website's metadata.

## Supported Language Features

This project supports [ES6](https://github.com/lukehoban/es6features) syntax features and it also supports:

* Async/await.
* Dynamic import()
* Static Properties.
* Class Decorator.
* JSX and Flow syntax.

Learn more about [different proposal stages](https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-).

## Supported CSS type

this project support `css`, `less` and `scss`, but I recommend you to use [styled-components](https://github.com/styled-components/styled-components) to write your style, it can only ship styles that are on the page so it can effectively reduce the bundle size of css file.

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
* Deploy a demo site
* CLI cmd to create page
* Rewrite SSR code
