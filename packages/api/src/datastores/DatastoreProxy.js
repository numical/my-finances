const config = require('../config');

class DatastoreProxy {
  #impl;
  #entity;

  constructor(entity) {
    this.#entity = entity;
  }

  #getImpl() {
    if (!this.#impl) {
      const dataSource = config.get('dataSource');
      this.#impl = new this.#entity[dataSource]();
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
