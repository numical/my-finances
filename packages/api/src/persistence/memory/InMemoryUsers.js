const InMemory = require('./InMemory');

class InMemoryUsers extends InMemory {
  constructor() {
    super(['users']);
  }
}

module.exports = InMemoryUsers;
