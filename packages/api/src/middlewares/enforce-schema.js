const report = require('./report-validation-errors');

const validateRequest = (validator, schema) => {
  const validate = validator.compile(schema);
  return (req, res, next) => {
    if (validate(req.body)) {
      next();
    } else {
      const msg = report(validate, '400: ');
      req.log.warn(msg);
      res.status(400).end();
    }
  }
};

const validateResponse = (validator, schema) => {
  const validate = validator.compile(schema);
  return (req, res, next) => {
    if (validate(res.body)) {
      next();
    } else {
      const msg = report(validate, '500: response validation: ');
      req.log.error(msg);
      res.status(500).end();
    }
  }
}

module.exports = {
  validateRequest,
  validateResponse
}