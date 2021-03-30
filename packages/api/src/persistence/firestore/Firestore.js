const { Firestore: FirestoreDb } = require('@google-cloud/firestore');
const { count, create, exists, get, search, update } = require('./ops');
const createValidationFn = require('./create-validation-fn');

const identity = (o) => o;

let db;

/**
 * See InMemory.js for contract.
 * Yes, yes, this would be easier with a TypeScript interface...
 */
class Firestore {
  constructor({
    collections,
    config,
    fromSchema,
    toSchema,
    enforceSchemaFn,
    transformToDoc = identity,
    transformFromDoc = identity,
    transformSearchField = identity,
  }) {
    if (!db) {
      db = new FirestoreDb();
    }

    if (config.dataSourceOptions.collectionSuffix) {
      collections[0] = `${collections}_${config.dataSourceOptions.collectionSuffix}`;
    }

    const validateTo = createValidationFn({
      collections,
      config,
      enforceSchemaFn,
      schema: toSchema,
    });

    const validateFrom = createValidationFn({
      collections,
      config,
      enforceSchemaFn,
      schema: fromSchema,
    });

    const args = {
      collections,
      db,
      transformToDoc: (record) => validateTo(transformToDoc(record)),
      transformFromDoc: (document) => validateFrom(transformFromDoc(document)),
      transformSearchField,
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
