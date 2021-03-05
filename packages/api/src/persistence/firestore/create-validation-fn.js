const createValidationFn = (collection, enforceSchema, schema) => {
  const validateSingleRecord = (operation, record) => {
    const errors = enforceSchema(schema, record);
    if (errors) {
      throw new Error(
        `Invalid firebase data for ${operation} ${collection}: ${JSON.stringify(
          record
        )} : ${errors}`
      );
    }
  };
  const validateMultipleRecords = (operation, record) => {
    if (Array.isArray(record)) {
      record.forEach(validateSingleRecord.bind(null, operation));
    } else {
      validateSingleRecord(operation, record);
    }
    return record;
  };
  return validateMultipleRecords;
};

const noOp = (operation, record) => record;

module.exports = ({ collection, config, enforceSchema, schema }) =>
  config.validate.data && schema
    ? createValidationFn(collection, enforceSchema, schema)
    : noOp;
