const { EOL } = require('os');
const DEFAULTS = require('./defaults');
const reportEnvironment = require('./report-environment');

const records = {};

const init = async (overrides = {}) => {
  const all = {
    ...DEFAULTS,
    ...overrides,
  };
  Object.assign(records, all);
  return records;
};

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
