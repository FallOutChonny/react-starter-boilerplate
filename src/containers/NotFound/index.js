import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./NotFound'),
  loading: () => null,
});
