import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';

import { createConfig, report } from './config/index.mjs';
import addEndPoints from './endpoints/index.mjs';
import { attachServices, errorHandler } from './middlewares/index.mjs';
import createDatastores from './persistence/index.mjs';
import { createEnforceSchemaFunction } from './schemas/index.mjs';
import createShutdownOptions from './shutdown-options.mjs';

export default async (customise = {}) => {
  const config = await createConfig(customise.config);
  const logger = pino(config.log);
  logger.info(report());
  const enforceSchemaFunction = createEnforceSchemaFunction({ logger });
  const datastores = createDatastores({
    config,
    enforceSchemaFunction,
  });
  const app = express();
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(pinoHttp({ logger }));
  app.use(attachServices({ datastores, enforceSchemaFunction }));
  if (customise.middleware) {
    customise.middleware(app);
  }
  addEndPoints({ app, config });
  app.use(errorHandler);

  const shutdownOptions = createShutdownOptions(config, logger);

  return {
    app,
    datastores,
    logger,
    shutdownOptions,
  };
};
