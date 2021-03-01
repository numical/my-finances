const { Firestore: FirestoreDb } = require('@google-cloud/firestore');
const { count, create, get, search, update } = require('./ops');
const createValidationFn = require('./create-validation-fn');

let db;

/**
 * See InMemory.js for contract.
 * Yes, yes, this would be easier with a TypeScript interface...
 */
class Firestore {
  constructor(args) {
    if (!db) {
      db = new FirestoreDb();
    }
    const validate = createValidationFn(args);
    const bindArgs = [this, validate, db, args.collection];
    this.count = count.bind(...bindArgs);
    this.create = create.bind(...bindArgs);
    this.get = get.bind(...bindArgs);
    this.search = search.bind(...bindArgs);
    this.update = update.bind(...bindArgs);
  }
}

module.exports = Firestore;
