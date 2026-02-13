/** @type {import('@remix-run/dev').AppConfig} */
export default {
  server: './server.js',
  serverBuildPath: 'netlify/functions/server.mjs',
  ignoredRouteFiles: ['**/*.css'],
};
