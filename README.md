<div align="center">
  <!-- Dependency Status -->
  <a href="https://david-dm.org/falloutchonny/react-starter-boilerplate" title="dependencies status">
    <img src="https://david-dm.org/falloutchonny/react-starter-boilerplate/status.svg"/>
  </a>
  <!-- devDependency Status -->
  <a href="https://david-dm.org/falloutchonny/react-starter-boilerplate?type=dev" title="devDependencies status">
    <img src="https://david-dm.org/falloutchonny/react-starter-boilerplate/dev-status.svg"/></a>
  <!-- Build Status -->
  <a href="https://travis-ci.org/FallOutChonny/react-starter-boilerplate">
    <img src="https://travis-ci.org/FallOutChonny/react-starter-boilerplate.svg?branch=master" alt="Build Status" />
  </a>
  <!-- Test Coverage -->
</div>

# React Starter Boilerplate

A starter kit for universal react app, this project is extends from ejected create-react-app.

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/falloutchonny/react-starter-boilerplate)

## Motivation

The motivation is simple, Best Development Experience and App performance.

When you start a new react project, you need to do a lot of settings:

1. `redux` store and middlewares as the state management.
2. `webpack` config for development and production.
3. Enable Hot-reload.
4. Configure `babel`, `eslint`, `jest` and more...
5. If project gets bigger, you need to setup some plugins such as `happypack`, `webpack-dll-plugin` to reduce webpack build time.

And once app is online, you have to optimize the performance for production.

All of the settings are very complicated, and if you want to go server-side rendering, it will be more complicated.

So I created this project and covers all the above settings, let you can focus on writing components, handling data flow and business logic.

## Uses

* `react` as the view.
* `react-router` v4 as the router.
* `react-loadable` provides component based code splitting
* `react-helmet` provides control of the page head from within components.
* `redux` as the state management container.
* `redux-saga` deal with asynchronous action flow.
* `react-router-redux` sync your router with redux state
* `reselect` to avoid frequent re-render that improve performance.
* `immutable.js` provides many persistent Immutable data structures.
* `styled-components` helps you organize CSS in react project.
* `font-awesome` as the Icons
* `babel` v7 for es6+ support and load babel-polyfill on-demand.
* `isomorphic-fetch` for http request.

## Features

### Best Developer Expreience

* `webpack` v3 for both development and production bundles.
* `webpack-DLL-plugin`, `cache-loader`, `happypack` for faster rebuild time.
* `react-hot-loader` enable hot-reload both client and server-side.
* `redux-devtools` for state history, playback, enable Time travel (you can also use redux-devtools-extension instead).
* `webpack-bundle-analyzer` to review webpack output files with an interactive zoomable treemap.
* `ESLint` maintain your code quality with ease.
* `Prettier` keep code style consistency, it will performing code formatting when commit.

You can also install [react-devtools](https://github.com/facebook/react-devtools), this is a browser extension made by facebook.

### Production Ready

* Route and component level code splitting.
* Async inject reducer and saga that are on the page.
* Offline support via service-worker.
* Long-term browser caching support.
* 🔥 Streaming Server-sdie rendering with  `renderToNodeStream` introduced in `react v16`
* Server-side cache To speed up SSR.

### SEO Friendly

This is a SSR (Server-side Rendering) project, so web content can be crawlable, and we use `react-helmet` to inject meta tags into html head dynamically from within components, so social medias like Google Plus and Facebook can know your website's metadata.

### Supported Language Features

This project supports all of the [ES6](https://github.com/lukehoban/es6features) and [ES7](https://github.com/ldfaiztt/es7-features) syntax features.

### Supported Style language

You can write `css`, `less` and `scss`, but I recommend you to use [styled-components](https://github.com/styled-components/styled-components).

## Let's Getting Started

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

Generate a DLL file stored in build/dll folder, this file bundles all of the third-party packages like react, redux, styled-components etc, so we don't need rebuild these module in dev, it will save a lot of webpack rebuild time that increase development efficiency.

### `npm run analyze`

Generate stats.json and report.html in build folder, you can upload stats.json file on [webpack.github.io/analyse/#hints](http://webpack.github.io/analyse/#hints) or open `report.html` see bundle content.

### `npm run flow`

Run the static type checker [flow checkers](https://flow.org/en/) to check your program.

### `npm run test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`

Run ESLint (code quality tool) that checks for problems in your app code.

### `npm run start`

Run your server with production build result.

## Folder Structure

`src`: Your app code.

`src/containers`: Routing components such as `Login`, `Home` pages...

`src/copomnents`: Shared specific styling components such as Button, Form...

`src/client`: client-side entry point

`src/server`: server-side entry point

`config`: Settings for project build.

`scripts`: CLI commands.

## Server-Side Rendering Data Flow

The data flow from server to client when received a http request, for more details you can see the code in `src/server/server.js`.

1. Runs matching of routes in react-router for server.
2. Extract all of the static preLoad methods from within components.
3. Makes async data fetching request.
4. Renders Route component to string.
5. Get `styled-components` style tags that are on page.
6. Get `react-loadable` chunks that are on page.
7. Generate HTML string (with Meta, Script, Style tags) and send to client.
8. Client-side receives html file with preload state from server.
9. Client-side initializes redux store with given state and render page.

## How To Remove Font-Awesome

1. Remove `config/font-awesome.config.js` and `config/font-awesome.config.less`.
2. Remove `Line 167` in `config/webpack.config.js`.
3. If you don't use other font icon, you can remove `woff`, `woff2`, `ttf`, `eot` loaders (in webpack.config.js `Line 91`).

## How To Add Bootstrap

1. Set `process.env.SHOULD_USE_BOOTSTRAP` is `true` in `config/webpack/index.js`.
2. Bootstrap css and js will load into webpack bundle.
3. You can install `reactstrap`, its a bootstrap 4 components for React.

## Road map

* Call API demo.
* Authentication Route.
* Load font-awesome 5 with inline style tag (like styled-components).
* Deploy a demo site.
* Rewrite homepage (I'm not good at UI design and I know it's ugly, can anyone give me some suggestions).
* Beauty terminal output.
* Modularized.
* Write unit test for react components, reducers and sagas.

## License

This project is licensed under the MIT license, For more information see `LICENSE`.
