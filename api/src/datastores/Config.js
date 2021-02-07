const InMemory = require('./InMemory');

class Config extends InMemory {
  init() {
    this.set('sessionTimeoutInMs', 10 * 60 * 1000);
  }
}

module.exports = Config;
