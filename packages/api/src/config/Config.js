const { EOL } = require('os');
const InMemory = require('../datastores/InMemory');
const DEFAULTS = require('./defaults');
const reportEnvironment = require('./report-environment');

class Config extends InMemory {
  #records = {};

  async init(overrides = {}) {
    const all = {
      ...DEFAULTS,
      ...overrides,
    };
    Object.assign(this.#records, all);
    return this.#records;
  }

  get(key) {
    return this.#records[key];
  }

  report() {
    return Object.entries(this.#records).reduce(
      (s, [key, value]) => `${s}${EOL}  ${key}: ${value}`,
      reportEnvironment()
    );
  }
}

module.exports = Config;
