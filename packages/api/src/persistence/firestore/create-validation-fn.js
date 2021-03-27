const createValidationFn = (collection, enforceSchemaFn, schema) => (
  record
) => {
  const errors = enforceSchemaFn(schema, record);
  if (errors) {
    throw new Error(
      `Invalid firebase data for ${operation} ${collection}: ${JSON.stringify(
        record
      )} : ${errors}`
    );
  }
  return record;
};

const noOp = (record) => record;

module.exports = ({ collection, config, enforceSchemaFn, schema }) =>
  config.validate.data && schema
    ? createValidationFn(collection, enforceSchemaFn, schema)
    : noOp;
