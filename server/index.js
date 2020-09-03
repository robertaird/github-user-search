const app = require('express')();

/* istanbul ignore else */
if (process.env.NODE_ENV !== 'production') {
  const path = require('path');
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });
}

const PORT = process.env.REACT_APP_SERVER_PORT || 8080;

require('./proxy')(app);

const server = app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`),
);

module.exports = server;
