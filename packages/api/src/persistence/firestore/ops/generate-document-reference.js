const validateCollectionIds = require('./validate-collection-ids');

module.exports = ({ collections, db, ids }) => {
  if (!Array.isArray(ids)) {
    ids = [ids];
  }
  validateCollectionIds(collections, ids);
  const query = collections.reduce(
    (query, collection, index) => `${query}/${collection}/${ids[index]}`,
    ''
  );
  return db.doc(query.slice(1));
};
