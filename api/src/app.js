const express = require('express');
const bodyParser = require('body-parser');
const endPoints = require('./endpoints');

const app = express();
app.use(bodyParser.json());

endPoints.forEach(({ verb, path, handler }) => {
  app[verb](path, handler);
});

module.exports = app;
