import App from './containers/App';
import Home from './containers/Home';
import About from './containers/About';
import NotFound from './containers/NotFound';

export default function createRoutes(/* store */) {
  // eslint-disable-line
  return [
    {
      component: App,
      routes: [
        { path: '/', exact: true, component: Home },
        { path: '/about', component: About },
        // { path: '/news', component: null },
        { component: NotFound },
      ],
    },
  ];
}
