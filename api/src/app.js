const express = require('express');
const bodyParser = require('body-parser');
const { config } = require('./datastores');
const endPoints = require('./endpoints');
const { enforceAuth } = require('./middlewares');

const init = async () => {
  await config.init();

  const app = express();
  app.use(bodyParser.json());

  endPoints.forEach(({ path, requiresAuth}) => {
    if (requiresAuth) {
      app.use(path, enforceAuth)
    }
  });

  endPoints.forEach(({ verb, path, handler }) => {
    app[verb](path, handler);
  });

  return app;
};

module.exports = {
  init,
};
