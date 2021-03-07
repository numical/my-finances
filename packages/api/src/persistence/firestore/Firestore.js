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
    schema,
    enforceSchema,
    transformToDoc = identity,
    transformFromDoc = identity,
    transformSearchField = identity,
  }) {
    if (!db) {
      db = new FirestoreDb();
    }

    const validate = createValidationFn({
      collection,
      config,
      enforceSchema,
      schema,
    });
    const args = {
      collection,
      db,
      transformToDoc,
      transformFromDoc,
      transformSearchField,
      validate,
    };
    this.count = count.bind(this, args);
    this.create = create.bind(this, args);
    this.get = get.bind(this, args);
    this.search = search.bind(this, args);
    this.update = update.bind(this, args);
  }
}

module.exports = Firestore;
