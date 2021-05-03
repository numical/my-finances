const createValidationFunction = require('./create-validation-function');
const validateCollectionIds = require('./validate-collection-ids');
const validateCollectionParentIds = require('./validate-collection-parent-ids');

module.exports = {
  createValidationFn: createValidationFunction,
  validateCollectionIds,
  validateCollectionParentIds,
};
