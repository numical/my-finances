export const CAN_OVERRIDE = Object.freeze({
  sessionTimeoutInSeconds: 10 * 60,
  dataSource: 'firestore',
  dataSourceOptions: {},
  shutdown: {
    timeoutInSeconds: 10,
  },
  validate: {
    request: true,
    response: true,
    data: true,
  },
});

export const CANNOT_OVERRIDE = Object.freeze({
  log: {
    customLevels: {
      log: 30,
      clientInfo: 35, // to differentiate from server info
    },
  },
});
