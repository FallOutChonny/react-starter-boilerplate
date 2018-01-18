import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./About'),
  loading: () => null,
});
