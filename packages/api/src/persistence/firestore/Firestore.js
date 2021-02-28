const { Firestore: FirestoreDb } = require('@google-cloud/firestore');

const SET_OPTIONS = {
  merge: true,
};

let db;
const getDocRef = (collection, id) => {
  if (!db) {
    db = new FirestoreDb();
  }
  return db.doc(`${collection}/${id}`);
}

const validate = (schema, enforceSchema, collection) => (operation, id, record) => {
  const errors = enforceSchema(schema, record);
  if (errors) {
    throw new Error(`Invalid firebase data for ${operation} ${collection} ${id}: ${JSON.stringify(record)} : ${errors}`);
  } else {
    return record;
  }
}

const noOp = (operation, id, record) => record;

class Firestore {
  #collection;
  #validate;

  constructor( { collection, config, schema, enforceSchema }) {
    this.#collection = collection;
    this.#validate = config.validate.data && schema
      ? validate(schema, enforceSchema, collection)
      : noOp
  }

  async get(id) {
    const ref = getDocRef(this.#collection, id);
    const snapshot = await ref.get();
    const record = snapshot.data();
    return this.#validate('get', id, record);
  }

  async create(id, record) {
    this.#validate('pre-create', id, record);
    const ref = getDocRef(this.#collection, id);
    await ref.create(record);
    const snapshot = await ref.get();
    const fetched = snapshot.data();
    return this.#validate('post-create', id, fetched);
  }

  async update(id, record) {
    this.#validate('pre-update', id, record);
    const ref = getDocRef(this.#collection, id);
    await ref.set(record, SET_OPTIONS);
    const snapshot = await ref.get();
    const fetched = snapshot.data();
    return this.#validate('post-update', id, fetched);
  }
}

module.exports = Firestore;
