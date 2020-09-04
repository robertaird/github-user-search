const express = require('express');
const path = require('path');

function addRouteMiddleware(app, subPath = '') {
  app.use(subPath, express.static(path.join(__dirname, '../build')));

  app.get(`${subPath}/*`, (_req, res) =>
    res.sendFile(path.join(__dirname, '../build/index.html')),
  );
}

module.exports = addRouteMiddleware;
