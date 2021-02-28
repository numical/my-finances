const createFn = (collection, schema, enforceSchema) => {
  const validate = (operation, record) => {
    const errors = enforceSchema(schema, record);
    if (errors) {
      throw new Error(
        `Invalid firebase data for ${operation} ${collection}: ${JSON.stringify(
          record
        )} : ${errors}`
      );
    }
  };
  return (operation, record) => {
    if (Array.isArray(record)) {
      record.forEach(validate.bind(null, operation));
    } else {
      validate(operation, record);
    }
    return record
  }
};

const noOp = (operation, record) => record;

module.exports = ({ collection, config, schema, enforceSchema }) =>
  config.validate.data && schema
    ? createFn(collection, schema, enforceSchema)
    : noOp;
