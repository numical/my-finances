const express = require('express');
const endPoints = require('./endpoints/endPoints');

const app = express();

endPoints.forEach(({ verb, path, handler }) => {
  app[verb](path, handler);
});

module.exports = app;
