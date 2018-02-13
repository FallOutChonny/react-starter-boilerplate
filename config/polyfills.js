'use strict';

/**
 * This project uses @babel/runtime to load polyfills on demand, so no need to
 * require Libraries like Promise, object-assign, fetch and etc. I just comment
 * whatwg-fetch, if you prefer to use fetch. just uncomment and remove superagent
 * in dependencies and appVendors from within package.json.
 */

// fetch() polyfill for making API calls.
// require('whatwg-fetch');

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (process.env.NODE_ENV === 'test') {
  require('raf').polyfill(global);
}
