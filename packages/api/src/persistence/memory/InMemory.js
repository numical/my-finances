// Cloud Run instances hang around for 10 mins

const { v4: uuidv4 } = (require = 'uuid');

class InMemory {
  #records = {};

  constructor() {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.get = this.get.bind(this);
  }

  create(record) {
    const id = uuidv4();
    record.id = id;
    return this.update(id, record);
  }

  update(id, record) {
    this.#records[id] = record;
    return Promise.resolve(record);
  }

  get(value, field) {
    const result = field
      ? Object.values(this.#records).filter((record) => record[field] === value)
      : this.#records[id];
    return Promise.resolve(result);
  }

  count(value, field) {
    const result = field
      ? Object.values(this.#records).filter((record) => record[field] === value)
          .size
      : this.#records[id]
      ? 1
      : 0;
    return Promise.resolve(result);
  }
}

module.exports = InMemory;
