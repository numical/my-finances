import gracefulShutdown from 'http-graceful-shutdown';

import createApp from './src/app.mjs';

const start = async (port) => {
  try {
    const { app, logger, shutdownOptions } = await createApp();
    const server = app.listen(port, () => {
      logger.info(`my-finances API listening on port ${port}`);
    });
    gracefulShutdown(server, shutdownOptions);
  } catch (error) {
    console.error(`my-finances API errored on startup`, error);
  }
};

start(process.env.PORT || 8080);
