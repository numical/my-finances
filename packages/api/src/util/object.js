/**
 * Return properties of first object that are different to the second.
 * @param obj1
 * @param obj2
 * @returns {{}}
 */
const diff = (object1, object2) =>
  Object.entries(object1).reduce((diff, [key, value]) => {
    if (object2[key] !== object1[key]) {
      diff[key] = value;
    }
    return diff;
  }, {});

const extractTruthy = (dictionary) =>
  Object.entries(dictionary).reduce((truthy, [key, value]) => {
    if (value) {
      truthy[key] = value;
    }
    return truthy;
  }, {});

const isEmpty = (object) => Object.keys(object).length === 0;

const isObject = (value) => typeof value === 'object' && value !== null;

module.exports = {
  diff,
  extractTruthy,
  isEmpty,
  isObject,
};
