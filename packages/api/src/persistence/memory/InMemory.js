// Cloud Run instances hang around for 10 mins

const { v4: uuidv4 } = require('uuid');
const { isObject } = require('../../util');

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

  get(id) {
    return Promise.resolve(this.#records[id]);
  }

  search(values) {
    const result =  Object.entries(values).reduce(
      (records, [field, value]) =>
        records.filter((record) => record[field] === value),
      Object.values(this.#records)
    );
    return Promise.resolve(result);
  }

  count(value) {
    return isObject(value)
      ? this.search(value).then(records => records.size)
      : this.#records[value]
      ? Promise.resolve(1)
      : Promise.resolve(0);
  }
}

module.exports = InMemory;
