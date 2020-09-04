const express = require('express');
const app = express();
const path = require('path');
const env = process.env.NODE_ENV || 'development';

function forceSsl(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, ['https://', req.get('Host'), req.url].join(''));
  }
  return next();
}

/* istanbul ignore else */
if (env !== 'production') {
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });
} else {
  app.use(forceSsl);
}

const PORT = process.env.REACT_APP_SERVER_PORT || 8080;

require('./proxy')(app);

if (env === 'production') {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  require('./routes')(app);
}
const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`),
);

module.exports = server;
