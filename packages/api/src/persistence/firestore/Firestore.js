const { Firestore: FirestoreDb } = require('@google-cloud/firestore');

let db;
const initialiseDb = () => {
  if (!db) {
    db = new FirestoreDb();
  }
};

const getCollectionRef = (collection) => db.collection(collection);

const getDocRef = (collection, id) => db.doc(`${collection}/${id}`);

const validate = (schema, enforceSchema, collection) => (operation, record) => {
  const errors = enforceSchema(schema, record);
  if (errors) {
    throw new Error(
      `Invalid firebase data for ${operation} ${collection}: ${JSON.stringify(
        record
      )} : ${errors}`
    );
  } else {
    return record;
  }
};

const noOp = (operation, id, record) => record;

class Firestore {
  #collection;
  #validate;

  constructor({ collection, config, schema, enforceSchema }) {
    initialiseDb();
    this.#collection = collection;
    this.#validate =
      config.validate.data && schema
        ? validate(schema, enforceSchema, collection)
        : noOp;
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.get = this.get.bind(this);
    this.#getById = this.#getById.bind(this);
    this.#getByValue = this.#getByValue.bind(this);
  }

  async create(record) {
    this.#validate('pre-create', { ...record, id: 'pre-creation dummy id' });
    const collectionRef = getCollectionRef(this.#collection);
    const docRef = await collectionRef.create(record);
    record.id = docRef.id;
    return record;
  }

  async update(id, record) {
    this.#validate('pre-update', record);
    const docRef = getDocRef(this.#collection, id);
    await docRef.update(record);
    return record;
  }

  async get(value, field) {
    return field ? this.#getByValue(value, field) : this.#getById(value);
  }

  async count(value, field) {
    if (field) {
      const collectionRef = getCollectionRef(this.#collection);
      const querySnapshot = collectionRef.where(field, '==', value).get();
      return querySnapshot.size;
    } else {
      const docRef = getDocRef(this.#collection, field);
      const docSnapshot = await docRef.get();
      return docSnapshot.exists ? 1 : 0;
    }
  }

  async #getById(id) {
    const docRef = getDocRef(this.#collection, id);
    const snapshot = await docRef.get();
    const record = snapshot.data();
    return this.#validate('getById', record);
  }

  async #getByValue(value, field) {
    const collectionRef = getCollectionRef(this.#collection);
    const querySnapshot = collectionRef.where(field, '==', value).get();
    switch (querySnapshot.size) {
      case 0:
        return null;
      case 1:
        const snapshot = querySnapshot.documents[0];
        const record = snapshot.data();
        return this.#validate('getByValue', record);
      default:
        return querySnapshot.documents.map((snapshot) => {
          const record = snapshot.data();
          this.#validate('getByValue', record);
          return record;
        });
    }
  }
}

module.exports = Firestore;
