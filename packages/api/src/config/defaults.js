const CAN_OVERRIDE = {
  sessionTimeoutInSeconds: 10 * 60,
  dataSource: 'firestore',
};

const CANNOT_OVERRIDE = {
  log: {
    customLevels: {
      log: 30, // needed for Ajv
      clientInfo: 35, // to differentiate from server info
    },
  },
};

module.exports = {
  CAN_OVERRIDE,
  CANNOT_OVERRIDE,
};
