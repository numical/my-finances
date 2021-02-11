// Cloud Run instances hang around for 10 mins

class InMemory {
  #records = {};

  get(id) {
    return Promise.resolve(this.#records[id]);
  }

  getAll() {
    return this.#records;
  }

  set(id, record) {
    return new Promise((resolve) => {
      this.#records[id] = record;
      resolve(record);
    });
  }
}

module.exports = InMemory;
