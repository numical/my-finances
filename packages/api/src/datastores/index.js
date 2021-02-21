const { financialModel, user } = require('./entity-implementations');
const DatastoreProxy = require('./DatastoreProxy');

module.exports = {
  financialModels: new DatastoreProxy(financialModel),
  users: new DatastoreProxy(user),
};
