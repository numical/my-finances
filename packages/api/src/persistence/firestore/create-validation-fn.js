const createValidationFn = (collections, enforceSchemaFn, schema) => (
  record
) => {
  const errors = enforceSchemaFn(schema, record);
  if (errors) {
    throw new Error(
      `Invalid firebase data for ${operation} ${collections.join(
        ','
      )}: ${JSON.stringify(record)} : ${errors}`
    );
  }
  return record;
};

const noOp = (record) => record;

module.exports = ({ collections, config, enforceSchemaFn, schema }) =>
  config.validate.data && schema
    ? createValidationFn(collections, enforceSchemaFn, schema)
    : noOp;
