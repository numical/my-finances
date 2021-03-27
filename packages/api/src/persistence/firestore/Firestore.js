const { Firestore: FirestoreDb } = require('@google-cloud/firestore');
const { count, create, get, search, update } = require('./ops');
const createValidationFn = require('./create-validation-fn');

const identity = (o) => o;

let db;

/**
 * See InMemory.js for contract.
 * Yes, yes, this would be easier with a TypeScript interface...
 */
class Firestore {
  constructor({
    collection,
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
      collection = `${collection}_${config.dataSourceOptions.collectionSuffix}`;
    }

    const validateTo = createValidationFn({
      collection,
      config,
      enforceSchemaFn,
      schema: toSchema,
    });

    const validateFrom = createValidationFn({
      collection,
      config,
      enforceSchemaFn,
      schema: fromSchema,
    });

    const args = {
      collection,
      db,
      transformToDoc: (record) => validateTo(transformToDoc(record)),
      transformFromDoc: (document) => validateFrom(transformFromDoc(document)),
      transformSearchField,
    };
    this.count = count(args);
    this.create = create(args);
    this.get = get(args);
    this.search = search(args);
    this.update = update(args);
  }
}

module.exports = Firestore;
