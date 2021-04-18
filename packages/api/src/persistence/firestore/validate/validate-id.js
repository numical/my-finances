const { object } = require('../../../util');

const { isObject } = object;

module.exports = (id) => {
  if (isObject(id)) {
    throw new Error(
      `datastore expects an id to be a primitive, not an object ${JSON.stringify(
        id
      )}`
    );
  }
};
