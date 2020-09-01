const proxy = require('express-http-proxy');

function addProxyMiddleware(app) {
  // Proxying the graphQL requests to keep the token server side
  app.use(
    '/graphql',
    proxy('api.github.com', {
      https: true,
      proxyReqOptDecorator: function addHeaders(proxyReqOpts) {
        proxyReqOpts.headers[
          'Authorization'
        ] = `token ${process.env.GITHUB_TOKEN}`;
        return proxyReqOpts;
      },
      proxyReqPathResolver: function setPath() {
        return '/graphql';
      },
    }),
  );

  // We'll be serving the build directory directly, one way or another
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    app.use('/*', proxy('localhost:3000'));
  }
}

module.exports = addProxyMiddleware;
