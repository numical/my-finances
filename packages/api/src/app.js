const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pino = require('pino');
const pinoHttp = require('pino-http');
const {  init } = require('./config');
const { createEndpoints } = require('./endpoints');
const { enforceSchema, errorHandler } = require('./middlewares');

const init = async (customise = {}) => {
  const config = await init(customise.config);

  const logger = pino(config.log);
  logger.info(config.report());

  const app = express();
  app.use(pinoHttp({ logger }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(enforceSchema(logger));

  if (customise.middleware) {
    customise.middleware(app);
  }

  createEndpoints(app);

  app.use(errorHandler);

  return app;
};

module.exports = {
  init,
};
