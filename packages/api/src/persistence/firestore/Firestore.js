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

    const { collectionSuffix } = config.dataSourceOptions;
    if (collectionSuffix) {
      /*
      collections = collections.map(
        (collection) => `${collection}_${collectionSuffix}`
      );
      */
      if (collections.length < 1) {
        throw new Error('Expecting top level collection');
      }
      collections[0] = `${collections[0]}_${collectionSuffix}`;
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

  startAtomic() {
    if (db.atomic) {
      throw new Error('atomic operation already started');
    }
    db.atomic = db.batch();
  }

  async commitAtomic() {
    if (!db.atomic) {
      throw new Error('no atomic operation to commit');
    }
    try {
      return await db.atomic.commit();
    } finally {
      db.atomic = null;
    }
  }
}

module.exports = Firestore;
