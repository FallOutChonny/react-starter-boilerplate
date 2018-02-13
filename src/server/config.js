/**
 * Configuration for server-side
 */
module.exports = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  publicUrl: process.env.PUBLIC_URL,
  isDev: process.env.NODE_ENV === 'development',
};
