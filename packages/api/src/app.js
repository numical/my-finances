const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pino = require('pino');
const pinoHttp = require('pino-http');
const config = require('./config');
const { createEndpoints } = require('./endpoints');
const { errorHandler, schemaValidator } = require('./middlewares');

const init = async (customise = {}) => {
  const { log } = await config.init(customise.config);

  const logger = pino(log);
  logger.info(config.report());

  const app = express();
  app.use(pinoHttp({ logger }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(schemaValidator(logger));

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
