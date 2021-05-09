import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';

import config from './config/index.mjs';
import endPoints from './endpoints/index.mjs';
import { attachServices, errorHandler } from './middlewares/index.mjs';
import persistence from './persistence/index.mjs';
import schemas from './schemas/index.mjs';

export default async (customise = {}) => {
  await config.init(customise.config);
  const logger = pino(config.log);
  logger.info(config.report());
  const enforceSchemaFunction = schemas.init({ logger });
  const dataStores = persistence.init({
    config,
    enforceSchemaFn: enforceSchemaFunction,
  });
  const app = express();
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(pinoHttp({ logger }));
  app.use(
    attachServices({ dataStores, enforceSchemaFn: enforceSchemaFunction })
  );
  if (customise.middleware) {
    customise.middleware(app);
  }
  endPoints.init({ app, config });
  app.use(errorHandler);
  return {
    app,
    dataStores,
  };
};
