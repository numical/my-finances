const InMemory = require('./InMemory');
const report = require('./report');

class Config extends InMemory {
  init() {
    this.set('sessionTimeoutInSeconds', 10 * 60);
    this.set('foo', 'bar');
  }
  report() {
    return report(this.getAll());
  }
}

module.exports = Config;
