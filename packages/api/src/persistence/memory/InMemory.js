// Cloud Run instances hang around for 10 mins

const { v4: uuidv4 } = require('uuid');
const { isObject } = require('../../util');

class InMemory {
  #records = {};

  constructor() {
    this.count = this.count.bind(this);
    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
    this.search = this.search.bind(this);
    this.update = this.update.bind(this);
  }

  /**
   *
   * @param {Object} record
   * @returns {Promise<Object>}  - record with id added
   */
  async create(record) {
    const id = uuidv4();
    const withId = { ...record, id };
    return this.update(id, withId);
  }

  /**
   *
   * @param {string} id
   * @param {Object} record
   * @returns {Promise<Object>}
   */
  async update(id, record) {
    this.#records[id] = record;
    return record;
  }

  /**
   *
   * @param {string} id
   * @returns {Promise<Object>} or null
   */
  async get(id) {
    if (isObject(id)) {
      throw new Error(
        `datastore get expects a primitive, not an object ${JSON.stringify(id)}`
      );
    }
    return this.#records[id] || null;
  }

  /**
   *
   * @param {Object} values
   * @returns {Promise<Array<Object>>} - could be empty
   */
  async search(values) {
    return Object.entries(values).reduce(
      (records, [field, value]) =>
        records.filter((record) => record[field] === value),
      Object.values(this.#records)
    );
  }

  /**
   *
   * @param {Object} value
   * @returns {Promise<number>}
   */
  async count(value) {
    if (isObject(value)) {
      const records = await this.search(value);
      return records.length;
    } else if (this.#records[value]) {
      return 1;
    } else {
      return 0;
    }
  }
}

module.exports = InMemory;
