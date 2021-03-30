const generateSearchQuey = require('./generate-search-query');

module.exports = ({ collections, db, transformSearchField }) => async ({
  parentIds,
  criteria,
}) => {
  const query = generateSearchQuey({
    collections,
    criteria,
    db,
    parentIds,
    transformSearchField,
  });
  const querySnapshot = await query.get();
  return querySnapshot.size;
};
