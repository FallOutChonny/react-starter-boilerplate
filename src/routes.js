import App from './containers/App';
import Home from './containers/Home';
import NotFound from './containers/NotFound';

export default function createRoutes(/* store */) {
  return [
    {
      component: App,
      routes: [
        {
          path: '/',
          exact: true,
          component: Home,
        },
        {
          path: '*',
          component: NotFound,
        },
      ],
    },
  ];
}
