import { ACCOUNT, MODEL, USER_DOC } from '../schemas/index.mjs';

import FireStore from './firestore/index.mjs';
import InMemory from './memory/index.mjs';

const ENTITIES = {
  accounts: {
    collections: ['accounts'],
    schema: ACCOUNT,
  },
  users: {
    collections: ['accounts', 'users'],
    schema: USER_DOC,
  },
  models: {
    collections: ['accounts', 'users', 'models'],
    schema: MODEL,
  },
};
export default ({ config, enforceSchemaFn }) => {
  const dataStores = {};
  const Datastore = config.dataSource === 'firestore' ? FireStore : InMemory;
  for (const [key, values] of Object.entries(ENTITIES)) {
    dataStores[key] = new Datastore({
      config,
      enforceSchemaFn,
      ...values,
    });
  }
  return dataStores;
};
