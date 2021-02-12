const polka = require('polka');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pino = require('pino');
const pinoHttp = require('pino-http');
const { config } = require('./datastores');
const endPoints = require('./endpoints');
const { addResponseHelpers, enforceAuth, errorHandler, notFoundHandler } = require('./middlewares');

const init = async () => {
  await config.init();

  const logger = pino();
  logger.info(config.report());

  const app = polka({
    onError: errorHandler,
    onNoMatch: notFoundHandler
  });
  app.use(
    pinoHttp({
      logger,
    })
  );
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(addResponseHelpers);

  endPoints.forEach(({ authPath }) => {
    if (authPath) {
      app.use(authPath, enforceAuth);
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
