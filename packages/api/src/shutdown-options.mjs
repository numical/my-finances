export default (config, logger) => ({
  timeout: config.shutdown.timeoutInSeconds * 1000,
  onShutdown: async () => logger.info(`my-finances API shutting down`),
  finally: () => logger.info(`my-finances API shut down`),
});
