const CAN_OVERRIDE = Object.freeze({
  sessionTimeoutInSeconds: 10 * 60,
  dataSource: 'firestore',
  dataSourceOptions: {},
  validate: {
    request: true,
    response: true,
    data: true,
  },
});
const CANNOT_OVERRIDE = Object.freeze({
  log: {
    customLevels: {
      log: 30,
      clientInfo: 35, // to differentiate from server info
    },
  },
});
export { CAN_OVERRIDE };
export { CANNOT_OVERRIDE };
export default {
  CAN_OVERRIDE,
  CANNOT_OVERRIDE,
};
