const DatastoreProxy = require('./DatastoreProxy');

module.exports = {
  financialModels: new DatastoreProxy(),
  users: new DatastoreProxy(),
};
