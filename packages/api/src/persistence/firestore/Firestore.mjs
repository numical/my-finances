/* eslint-disable unicorn/filename-case */
import firestore from '@google-cloud/firestore';

import {
  count,
  create,
  del,
  exists,
  get,
  search,
  update,
} from './ops/index.mjs';
import createValidationFunction from './validate/create-validation-function.mjs';
// eslint-disable-next-line unicorn/filename-case
const { Firestore: FirestoreDatabase } = firestore;
let database;
/**
 * See InMemory.js for contract.
 * Yes, yes, this would be easier with a TypeScript interface...
 */
class Firestore {
  constructor({ collections, config, enforceSchemaFn, schema }) {
    if (!database) {
      database = new FirestoreDatabase();
    }
    const { collectionSuffix } = config.dataSourceOptions;
    if (collectionSuffix) {
      /*
            collections = collections.map(
              (collection) => `${collection}_${collectionSuffix}`
            );
            */
      if (collections.length === 0) {
        throw new Error('Expecting top level collection');
      }
      collections[0] = `${collections[0]}_${collectionSuffix}`;
    }
    const validate = createValidationFunction({
      collections,
      config,
      enforceSchemaFn,
      schema,
    });
    const arguments_ = {
      collections,
      db: database,
      validate,
    };
    this.count = count(arguments_);
    this.create = create(arguments_);
    this.del = del(arguments_);
    this.exists = exists(arguments_);
    this.get = get(arguments_);
    this.search = search(arguments_);
    this.update = update(arguments_);
  }
  startAtomic() {
    if (database.atomic) {
      throw new Error('atomic operation already started');
    }
    database.atomic = database.batch();
  }
  async commitAtomic() {
    if (!database.atomic) {
      throw new Error('no atomic operation to commit');
    }
    try {
      return await database.atomic.commit();
    } finally {
      database.atomic = undefined;
    }
  }
}
export default Firestore;
