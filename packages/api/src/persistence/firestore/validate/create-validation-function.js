const { partial } = require('../../../schemas');

const createValidationFunction = (
  collections,
  enforceSchemaFunction,
  schema
) => {
  const partialSchema = partial(schema);
  return (entity, allowPartial) => {
    const schemaToUse = allowPartial ? partialSchema : schema;
    const errors = enforceSchemaFunction(schemaToUse, entity);
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
    ? createValidationFunction(collections, enforceSchemaFn, schema)
    : noOp;
