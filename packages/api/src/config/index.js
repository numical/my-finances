const { EOL } = require('os');
const { CAN_OVERRIDE, CANNOT_OVERRIDE } = require('./defaults');
const deepMerge = require('./deep-merge');
const reportEnvironment = require('./report-environment');

const config = {};

const init = async (overrides = {}) =>
  deepMerge(config, CAN_OVERRIDE, overrides, CANNOT_OVERRIDE);

const report = () =>
  Object.entries(config)
    .filter(([key, value]) => typeof value !== 'function')
    .reduce(
      (s, [key, value]) =>
        `${s}${EOL}  ${key}: ${JSON.stringify(value, null, 2)}`,
      reportEnvironment()
    );

config.init = init;
config.report = report;
config.DEFAULT_TEST_LOG_LEVEL = CANNOT_OVERRIDE.log.customLevels.clientInfo;

module.exports = config;
