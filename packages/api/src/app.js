const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pino = require('pino');
const pinoHttp = require('pino-http');
const config = require('./config');
const endPoints = require('./endpoints');
const persistence = require('./persistence');
const schemas = require('./schemas');
const { attachServices, errorHandler } = require('./middlewares');

module.exports = async (customise = {}) => {
  await config.init(customise.config);

  const logger = pino(config.log);
  logger.info(config.report());

  const enforceSchemaFn = schemas.init({ logger });
  const dataStores = persistence.init({ config, enforceSchemaFn });

  const app = express();
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(pinoHttp({ logger }));
  app.use(attachServices({ dataStores, enforceSchemaFn }));

  if (customise.middleware) {
    customise.middleware(app);
  }

  endPoints.init({ app, config });

  app.use(errorHandler);

  return app;
};
