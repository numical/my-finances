const config = require('../config');
const Firestore = require('./Firestore');
const InMemory = require('./InMemory');

class DatastoreProxy {
  #impl;

  #getImpl() {
    if (!this.#impl) {
      const dataSource = config.get('dataSource');
      const Type = dataSource === 'firestore' ? Firestore : InMemory;
      this.#impl = new Type();
    }
    return this.#impl;
  }

  async get(id) {
    return this.#getImpl().get(id);
  }

  async set(id, record) {
    return this.#getImpl().set(id, record);
  }
}

module.exports = DatastoreProxy;
