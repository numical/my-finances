const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pino = require('pino');
const pinoHttp = require('pino-http');
const config = require('./config');
const endPoints = require('./endpoints');
const { enforceAuth, errorHandler } = require('./middlewares');

const init = async (customise = {}) => {
  await config.init();

  const logger = pino(customise.log);
  logger.info(config.report());

  const app = express();
  app.use(
    pinoHttp({
      logger,
    })
  );
  app.use(bodyParser.json());
  app.use(cookieParser());

  if (customise.middleware) {
    customise.middleware(app);
  }

  endPoints.forEach(({ path, requiresAuth }) => {
    if (requiresAuth) {
      app.use(path, enforceAuth);
    }
  });

  endPoints.forEach(({ verb, path, handler }) => {
    app[verb](path, handler);
  });

  app.use(errorHandler);

  return app;
};

module.exports = {
  init,
};
