const { partial } = require('../../../schemas');

const createValidationFn = (collections, enforceSchemaFn, schema) => {
  const partialSchema = partial(schema);
  return (entity, allowPartial) => {
    const schemaToUse = allowPartial ? partialSchema : schema;
    const errors = enforceSchemaFn(schemaToUse, entity);
    if (errors) {
      throw new Error(
        `Invalid firebase data for ${collections.join(',')}: ${JSON.stringify(
          entity
        )} : ${errors}`
      );
    }
    return entity;
  };
};

const noOp = (record) => record;

module.exports = ({ collections, config, enforceSchemaFn, schema }) =>
  config.validate.data && schema
    ? createValidationFn(collections, enforceSchemaFn, schema)
    : noOp;
