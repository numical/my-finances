const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pino = require('pino');
const pinoHttp = require('pino-http');
const { config } = require('./datastores');
const endPoints = require('./endpoints');
const { enforceAuth, errorHandler } = require('./middlewares');

/**
 * Configure web server
 * @param additionalMiddleware
 * @returns {Promise<*|Express>}
 */
const init = async (additionalMiddleware) => {
  await config.init();

  const logger = pino();
  logger.info(config.report());

  const app = express();
  app.use(
    pinoHttp({
      logger,
    })
  );
  app.use(bodyParser.json());
  app.use(cookieParser());

  if (additionalMiddleware) {
    additionalMiddleware(app);
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
