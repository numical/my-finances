const { Firestore: FirestoreDb } = require('@google-cloud/firestore');
const { count, create, exists, get, search, update } = require('./ops');
const createValidationFn = require('./validate/create-validation-fn');

let db;

/**
 * See InMemory.js for contract.
 * Yes, yes, this would be easier with a TypeScript interface...
 */
class Firestore {
  constructor({ collections, config, schema, enforceSchemaFn }) {
    if (!db) {
      db = new FirestoreDb();
    }

    if (config.dataSourceOptions.collectionSuffix) {
      collections[0] = `${collections}_${config.dataSourceOptions.collectionSuffix}`;
    }

    const validate = createValidationFn({
      collections,
      config,
      enforceSchemaFn,
      schema,
    });

    const args = {
      collections,
      db,
      validate,
    };
    this.count = count(args);
    this.create = create(args);
    this.exists = exists(args);
    this.get = get(args);
    this.search = search(args);
    this.update = update(args);
  }
}

module.exports = Firestore;
