const { object } = require('../src/util');
module.exports = (test) => {
  test.sameExcept = (found, wanted, except, message, extra) => {
    if (!object.isObject(found)) {
      throw new Error(`Found '${found}' meant to be an object`);
    }
    if (!object.isObject(wanted)) {
      throw new Error(`Found '${wanted}' meant to be an object`);
    }
    const fieldsToRemove = Array.isArray(except) ? except : [except];
    const foundToTest = { ...found };
    const wantedToTest = { ...wanted };
    fieldsToRemove.forEach((field) => {
      delete foundToTest[field];
      delete wantedToTest[field];
    });
    return test.same(foundToTest, wantedToTest, message, extra);
  };
};
