/**
 * Return properties of first object that are different to the second.
 * @param obj1
 * @param obj2
 * @returns {{}}
 */
const diff = (obj1, obj2) =>
  Object.entries(obj1).reduce((diff, [key, value]) => {
    if (obj2[key] !== obj1[key]) {
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

const isEmpty = (obj) => Object.keys(obj).length === 0;

const isObject = (value) => typeof value === 'object' && value !== null;

module.exports = {
  diff,
  extractTruthy,
  isEmpty,
  isObject,
};
