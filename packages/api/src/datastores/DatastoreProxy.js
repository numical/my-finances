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

  async create(id, record) {
    return this.#getImpl().create(id, record);
  }

  async update(id, record) {
    return this.#getImpl().update(id, record);
  }

  async get(id) {
    return this.#getImpl().get(id);
  }
}

module.exports = DatastoreProxy;
