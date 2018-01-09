# React Starter Boilerplate

A starter kit for universal react app, this project is extends from ejected create-react-app.

## Motivation

The motivation is simple, Best Development Experience and App performance.

When you start a new react project, you need to do a lot of settings:

1. You have to config `redux` store and middlewares.
2. You have to config `webpack` for development and production.
3. If you want to enable hot-reload, you have to config `react-hot-loader`.
4. If project become large, you need to config `happypack`, `webpack-dll-plugin` to reduce webpack rebuild time.
4. You have to optimize the performance in production environment.

All of the settings are very complicated, and ff you want to go server-side rendering, it will be more complicated.

So I created this project and covers all the above settings, let you can focus on writing components, handling data flow and business logic.

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
* `bootstrap` v4 for quickly building responsive, mobile-first pages.
* `font-awesome` as the Icons

## Better Developer Expreience

I've integrated some packages and tools that can reduce webpack initial/rebuild time, hot-reload both on client and server side, and help you debugging application.

* `webpack` v3 for both development and production bundles.
* `webpack-DLL-plugin`, `cache-loader`, `happypack` for faster rebuild time
* Hot-reloading using `react-hot-loader`
* Time travel using `redux-devtools`
* `webpack-bundle-analyzer` to review webpack output files with an interactive zoomable treemap.
* `Prettier` and `ESLint` keep code style consistency, it will performing code formatting when commit.

You can also install [react-devtools](https://github.com/facebook/react-devtools), this is a browser extension made by facebook.

## Production Ready

* Split vendor libraries from app code.
* Route and component based code splitting.
* Async inject reducer and saga.
* Offline support via service-worker.
* Long-term browser caching support.

## SEO Friendly

This project is using Server-side rendering, so web content can be crawlable, and use `react-helmet` to inject meta tags into html head dynamically from within components, so social medias like Google Plus and Facebook can know your website's metadata.

## Supported Language Features

This project supports [ES6](https://github.com/lukehoban/es6features) syntax features and it also supports:

* Async/await.
* Dynamic import()
* Static Properties.
* Class Decorator.
* JSX and Flow syntax.

Learn more about [different proposal stages](https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-).

## Supported CSS type

You can write `css`, `less` and `scss`, but I recommend you to use [styled-components](https://github.com/styled-components/styled-components) to write your style, it can only ship styles that are on the page so it can effectively reduce the bundle size of css file.

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

## How To Create A Route

...

## Server-Side Rendering Data Flow

The data flow from server to client when received a http request, for more details you can see the code from `Line 45` to `Line 11` in `src/server/index.js`.

1. Runs matching of routes in react-router for server (`Line 68`).
2. Extract all of the static preLoad methods from within components (`Line 69` to ` Line 71`).
3. Makes async data fetching request (`Line 73`).
4. Renders Route component to string (from `Line 78` to `Line 96`).
5. Get `styled-components` style tags that are on page (`Line 97`).
6. Get `react-loadable` chunks that are on page (`Line 98`).
7. Generate HTML string (with Meta, Script, Style tags) and send to client (from `Line 99` to `Line 109`).
8. Client-side receives html file with preload state from server.
9. Client-side initializes redux store with given state and render page.

## How To Remove Bootstrap, Font-Awesome

If you don't want to use `bootstrap` and `font-awesome`, you can easily to remove them.

### Bootstrap

1. Remove `config/bootstrap.config.js` file.<br>
2. Remove `Line 20` and `Line 163` in `config/webpack.config.js`.
3. Remove used `reactstrap` components in containers and components folder.

### Font-awesome

1. Remove `config/font-awesome.config.js` and `config/font-awesome.config.less`.
2. Remove `Line 167` in `config/webpack.config.js`.
3. If you don't use other font icon, you can remove `woff`, `woff2`, `ttf`, `eot` loaders (in webpack.config.js `Line 91`).

## Road map

* Write README
* Write examples
* Write unit test for react components, reducers and sagas
* preact on production
* Deploy a demo site
* CLI cmd to create page
* Rewrite SSR code

## License

This project is licensed under the MIT license, For more information see `LICENSE`.
