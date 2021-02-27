const { Firestore: FirestoreDb } = require('@google-cloud/firestore');

const SET_OPTIONS = {
  merge: true,
};

let db;

const initialiseDb = () => {
  if (db) return;
  db = new FirestoreDb();
};

class Firestore {
  #collection;

  #getDocRef(id) {
    return db.doc(`${this.#collection}/${id}`);
  }

  constructor(collection) {
    initialiseDb();
    this.#collection = collection;
  }

  async get(id) {
    const ref = this.#getDocRef(id);
    const snapshot = await ref.get();
    return snapshot.data();
  }

  async create(id, record) {
    const ref = this.#getDocRef(id);
    await ref.create(record, SET_OPTIONS);
    const snapshot = await ref.get();
    return snapshot.data();
  }

  async update(id, record) {
    const ref = this.#getDocRef(id);
    await ref.set(record, SET_OPTIONS);
    const snapshot = await ref.get();
    return snapshot.data();
  }
}

module.exports = Firestore;
