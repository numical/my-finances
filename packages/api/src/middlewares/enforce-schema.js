const noOp = require('./no-op');
const report = require('./report-validation-errors');

const isValidationEnabled = ({ validate }) =>
  Object.values(validate).some((value) => !!value);

const enableValidation = (schemaValidator) => {
  const cache = new Map();
  const enforceSchema = (schema, data) => {
    let validate = cache.get(schema);
    if (!validate) {
      validate = schemaValidator.compile(schema);
      cache.set(schema, validate);
    }
    if (validate(data)) {
      return null;
    } else {
      return report(validate);
    }
  };
  return (req, res, next) => {
    req.enforceSchema = enforceSchema;
    next();
  };
};

module.exports = ({ config, schemaValidator }) =>
  isValidationEnabled(config) ? enableValidation(schemaValidator) : noOp;
