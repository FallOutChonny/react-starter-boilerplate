import LRUCache from 'lru-cache';

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 30, // 0.5hour
});

export default ssrCache;
