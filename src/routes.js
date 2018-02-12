import App from './containers/App';
import About from './containers/About';
import Home from './containers/Home';
import Login from './containers/Login';
import NotFound from './containers/NotFound';

export default function createRoutes(/* store */) {
  return [
    {
      component: App,
      routes: [
        { path: '/', exact: true, component: Home },
        { path: '/about', component: About },
        { path: '/login', component: Login },
        // { path: '/news', component: null },
        { component: NotFound },
      ],
    },
  ];
}
