const path = require('path');

if (process.env.NODE_ENV === 'production') {
  require(path.join(process.cwd(), './server/index.js'));
} else {
  const concurrently = require('concurrently');
  concurrently(
    [
      'npm:start:server',
      'npm:relay:watch',
      {
        command: 'npx react-scripts start',
        name: 'react-scripts',
      },
    ],
    {
      prefix: 'name',
      killOthers: ['failure', 'success'],
      restartTries: 3,
    },
  ).then(console.log, console.error);
}
