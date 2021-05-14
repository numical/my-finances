import createAjv from './create-ajv.mjs';
import report from './report-validation-errors.mjs';

const cache = new Map();
let ajv;
const getValidator = (schema) => {
  let validate = cache.get(schema);
  if (!validate) {
    try {
      validate = ajv.compile(schema);
      cache.set(schema, validate);
    } catch (error) {
      const id = schema.metadata ? schema.metadata.id : 'missing id';
      error.message = `schema compilation error: schema id '${id}': ${error.message}`;
      throw error;
    }
  }
  return validate;
};
const enforceSchemaFunction = (schema, data) => {
  const validate = getValidator(schema);
  return validate(data) ? undefined : report(validate);
};

export default ({ logger }) => {
  if (!ajv) {
    ajv = createAjv(logger);
  }
  return enforceSchemaFunction;
};

