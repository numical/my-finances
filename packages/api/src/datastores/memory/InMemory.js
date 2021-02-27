// Cloud Run instances hang around for 10 mins

class InMemory {
  #records = {};

  create(id, record) {
    if (this.#records[id]) {
      return Promise.reject(`id '${id}' already exists`);
    } else {
      return this.update(id, record);
    }
  }

  update(id, record) {
    this.#records[id] = record;
    return Promise.resolve(record);
  }

  get(id) {
    return Promise.resolve(this.#records[id]);
  }
}

module.exports = InMemory;
