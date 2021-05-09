import { validateCollectionIds } from '../validate/index.mjs';

export default ({ collections, db, ids }) => {
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
