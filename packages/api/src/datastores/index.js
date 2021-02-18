const InMemory = require('./InMemory');

module.exports = {
  financialModels: new InMemory(),
  users: new InMemory(),
};
