const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const SchemaValidator = require('ajv/dist/jtd').default;
const pino = require('pino');
const pinoHttp = require('pino-http');
const config = require('./config');
const { createEndpoints } = require('./endpoints');
const { errorHandler } = require('./middlewares');

const init = async (customise = {}) => {
  const { log } = await config.init(customise.config);

  const logger = pino(log);
  logger.info(config.report());

  const app = express();
  app.use(pinoHttp({ logger }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  if (customise.middleware) {
    customise.middleware(app);
  }

  const schemaValidator = new SchemaValidator({ logger });
  createEndpoints(app, schemaValidator);

  app.use(errorHandler);

  return app;
};

module.exports = {
  init,
};
