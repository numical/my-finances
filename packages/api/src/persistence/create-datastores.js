const FireStore = require('./firestore');
const InMemory = require('./memory');
const { ACCOUNT, MODEL, USER } = require('../schemas');

const ENTITIES = {
  accounts: {
    collections: ['accounts'],
    schema: ACCOUNT,
  },
  users: {
    collections: ['users'],
    schema: USER,
  },
  models: {
    collections: ['users', 'models'],
    schema: MODEL,
  },
};

module.exports = ({ config, enforceSchemaFn }) => {
  const dataStores = {};
  const Datastore = config.dataSource === 'firestore' ? FireStore : InMemory;

  Object.entries(ENTITIES).forEach(([key, values]) => {
    dataStores[key] = new Datastore({
      config,
      enforceSchemaFn,
      ...values,
    });
  });

  return dataStores;
};
