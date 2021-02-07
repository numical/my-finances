const InMemory = require('./InMemory');
const Config = require('./Config');

module.exports = {
  config: new Config(),
  financialModels: new InMemory(),
  users: new InMemory(),
};
