// Cloud Run instances hang around for 10 mins

// eslint-disable-next-line unicorn/filename-case
const { randomBytes } = require('crypto');

// must match Firestore ID format 20
const createId = () => randomBytes(10).toString('hex');

class InMemory {
  constructor({ collections }) {
    this.count = this.count.bind(this);
    this.create = this.create.bind(this);
    this.del = this.del.bind(this);
    this.get = this.get.bind(this);
    this.search = this.search.bind(this);
    this.update = this.update.bind(this);
    this.generateId = (ids) => {
      const idArray = Array.isArray(ids) ? ids : [ids];
      return collections.reduce(
        (id, collection, index) => `${id}/${collection}/${idArray[index]}`,
        ''
      );
    };
    this.collectionPath = `/${collections[collections.length - 1]}/`;
    this.docs = {};
  }

  /**
   *
   * @param entity
   * @param parentIds
   * @returns {Promise<Object>}
   */
  async create({ entity, parentIds }) {
    if (!entity.id) {
      entity.id = createId();
    }
    const ids = parentIds || [];
    ids.push(entity.id);
    return this.update({ entity, ids });
  }

  /**
   *
   * @param entity
   * @param ids
   * @returns {Promise<*>}
   */
  async update({ entity, ids }) {
    const id = this.generateId(ids);
    this.docs[id] = entity;
    return entity;
  }

  /**
   *
   * @param ids
   * @returns {Promise<void>}
   */
  async del({ ids }) {
    const id = this.generateId(ids);
    delete this.docs[id];
  }

  /**
   *
   * @param ids
   * @returns {Promise<*|null>}
   */
  async get(ids) {
    const id = this.generateId(ids);
    return this.docs[id] || undefined;
  }

  /**
   *
   * @param ids
   * @returns {Promise<boolean>}
   */
  async exists(ids) {
    const id = this.generateId(ids);
    return !!this.docs[id];
  }

  /**
   *
   * @param parentIds
   * @param values
   * @returns {Promise<[string, unknown]>}
   */
  async search({ parentIds, criteria }) {
    const searchFor = parentIds
      ? this.generateId([...parentIds, ''])
      : this.collectionPath;
    const searchOp = parentIds ? 'startsWith' : 'includes';
    const collectionDocuments = Object.entries(this.docs).reduce(
      (documents, [id, document]) => {
        if (id[searchOp](searchFor)) {
          documents.push(document);
        }
        return documents;
      },
      []
    );
    return criteria
      ? Object.entries(criteria).reduce(
          (documents, [field, value]) =>
            documents.filter((document) => document[field] === value),
          collectionDocuments
        )
      : collectionDocuments;
  }

  /**
   *
   * @param parentIds
   * @param criteria
   * @returns {Promise<number>}
   */
  async count({ parentIds, criteria }) {
    const results = await this.search({ parentIds, criteria });
    return results.length;
  }

  /**
   *
   */
  startAtomic() {
    // no op
  }

  /**
   *
   * @returns {Promise<void>}
   */
  commitAtomic() {
    return Promise.resolve();
  }
}

module.exports = InMemory;
