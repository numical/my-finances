const createAjv = require('./create-ajv');
const report = require('./report-validation-errors');

const cache = new Map();
let ajv;

const enforceSchemaFunction = (schema, data) => {
  let validate = cache.get(schema);
  if (!validate) {
    try {
      validate = ajv.compile(schema);
      cache.set(schema, validate);
    } catch (err) {
      const id = schema.metadata ? schema.metadata.id : 'missing id';
      err.message = `schema compilation error: schema id '${id}': ${err.message}`;
      throw err;
    }
  }
  if (validate(data)) {
    return null;
  } else {
    return report(validate);
  }
};

const createEnforceSchemaFunction = ({ logger }) => {
  if (!ajv) {
    ajv = createAjv(logger);
  }
  return enforceSchemaFunction;
};

module.exports = createEnforceSchemaFunction;