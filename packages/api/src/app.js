const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pino = require('pino');
const pinoHttp = require('pino-http');
const Ajv = require('ajv/dist/jtd').default;
const { init, report } = require('./config');
const { createEndpoints } = require('./endpoints');
const { enforceSchema, errorHandler, persistence } = require('./middlewares');

module.exports = async (customise = {}) => {
  const config = await init(customise.config);

  const logger = pino(config.log);
  logger.info(report());
  const schemaValidator = new Ajv({ logger });

  const app = express();
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(pinoHttp({ logger }));
  app.use(enforceSchema({ config, schemaValidator }));
  app.use(persistence({ config, schemaValidator }));

  if (customise.middleware) {
    customise.middleware(app);
  }

  createEndpoints({ app, config });

  app.use(errorHandler);

  return app;
};
