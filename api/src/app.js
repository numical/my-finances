const express = require('express');
const bodyParser = require('body-parser');
const { config } = require('./datastores');
const endPoints = require('./endpoints');

const init = async () => {
  await config.init();

  const app = express();
  app.use(bodyParser.json());

  endPoints.forEach(({ verb, path, handler }) => {
    app[verb](path, handler);
  });

  return app;
};

module.exports = {
  init,
};
