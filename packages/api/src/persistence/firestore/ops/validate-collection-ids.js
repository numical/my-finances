const validateId = require('./validate-id');

module.exports = (collections, ids) => {
  if (collections.length !== ids.length) {
    throw new Error(
      `datastore expects number of ids [${ids.join(
        ','
      )}] to equal collections [${collections.join(',')}]`
    );
  }
  ids.forEach(validateId);
};
