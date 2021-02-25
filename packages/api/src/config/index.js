const { EOL } = require('os');
const DEFAULTS = require('./defaults');
const deepMerge = require('./deep-merge');
const reportEnvironment = require('./report-environment');

const records = {};

const init = async (overrides = {}) => deepMerge(records, DEFAULTS, overrides);

const get = (key) => records[key];

const report = () =>
  Object.entries(records).reduce(
    (s, [key, value]) => `${s}${EOL}  ${key}: ${JSON.stringify(value, null, 2)}`,
    reportEnvironment()
  );

module.exports = {
  init,
  get,
  report,
};
