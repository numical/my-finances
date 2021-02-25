// Cloud Run instances hang around for 10 mins

class InMemory {
  #records = {};

  create(id, record) {
    return this.set(id, record);
  }

  set(id, record) {
    return new Promise((resolve) => {
      this.#records[id] = record;
      resolve(record);
    });
  }

  get(id) {
    return Promise.resolve(this.#records[id]);
  }
}

module.exports = InMemory;
