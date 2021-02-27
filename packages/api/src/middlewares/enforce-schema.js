const Ajv = require('ajv/dist/jtd').default;
const report = require('./report-validation-errors');

module.exports = (logger) => {
  const ajv = new Ajv({ logger });
  const cache = new Map();
  const enforceSchema = (schema, data) => {
    let validate = cache.get(schema);
    if (!validate) {
      validate = ajv.compile(schema);
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