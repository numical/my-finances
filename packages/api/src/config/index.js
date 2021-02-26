const { EOL } = require('os');
const { CAN_OVERRIDE, CANNOT_OVERRIDE } = require('./defaults');
const deepMerge = require('./deep-merge');
const reportEnvironment = require('./report-environment');

const records = {};

const init = async (overrides = {}) =>
  deepMerge(records, CAN_OVERRIDE, overrides, CANNOT_OVERRIDE);

const get = (key) => records[key];

const report = () =>
  Object.entries(records).reduce(
    (s, [key, value]) =>
      `${s}${EOL}  ${key}: ${JSON.stringify(value, null, 2)}`,
    reportEnvironment()
  );

module.exports = {
  init,
  get,
  report,
};
