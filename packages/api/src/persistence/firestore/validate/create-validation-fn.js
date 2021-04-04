const createValidationFn = (collections, enforceSchemaFn, schema) => (
  entity
) => {
  const errors = enforceSchemaFn(schema, entity);
  if (errors) {
    throw new Error(
      `Invalid firebase data for ${collections.join(',')}: ${JSON.stringify(
        entity
      )} : ${errors}`
    );
  }
  return entity;
};

const noOp = (record) => record;

module.exports = ({ collections, config, enforceSchemaFn, schema }) =>
  config.validate.data && schema
    ? createValidationFn(collections, enforceSchemaFn, schema)
    : noOp;
