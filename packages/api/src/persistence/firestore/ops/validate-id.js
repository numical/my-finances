const { isObject } = require('../../../util');

module.exports = (id) => {
  if (isObject(id)) {
    throw new Error(
      `datastore expects an id to be a primitive, not an object ${JSON.stringify(
        id
      )}`
    );
  }
};
