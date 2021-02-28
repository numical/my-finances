const Ajv = require('ajv/dist/jtd').default;
const report = require('./report-validation-errors');

const cache = new Map();

const createEnforceSchemaFunction = ({ logger }) => (schema, data) => {
  const ajv = new Ajv({ logger });
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

module.exports = createEnforceSchemaFunction;