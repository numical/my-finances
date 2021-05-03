const { object } = require('../src/util');
module.exports = (test) => {
  test.sameExcept = (found, wanted, except, message, extra) => {
    if (!object.isObject(found)) {
      throw new TypeError(`Found '${found}' meant to be an object`);
    }
    if (!object.isObject(wanted)) {
      throw new TypeError(`Found '${wanted}' meant to be an object`);
    }
    const fieldsToRemove = Array.isArray(except) ? except : [except];
    const foundToTest = { ...found };
    const wantedToTest = { ...wanted };
    for (const field of fieldsToRemove) {
      delete foundToTest[field];
      delete wantedToTest[field];
    }
    return test.same(foundToTest, wantedToTest, message, extra);
  };
};
