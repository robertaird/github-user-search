const proxy = require('express-http-proxy');

function addProxyMiddleware(app, subPath = '') {
  // Proxying the graphQL requests to keep the token server side
  app.use(
    `${subPath}/graphql`,
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

  /* proxy to localhost:3000 for react-scripts if not production */
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    app.use(`${subPath}/*`, proxy('localhost:3000'));
  }
}

module.exports = addProxyMiddleware;
