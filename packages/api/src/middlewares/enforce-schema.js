const Ajv = require('ajv/dist/jtd').default;
const report = require('./report-validation-errors');

const schemaValidator = (logger) => {
  const ajv = new Ajv({ logger });
  const cache = new Map();
  const validate = (schema) => {
    const validateFn = cache.get(schema);
    if (validateFn) {
      return validateFn;
    } else {
      cache.set(schema, ajv.compile(schema));
      return cache.get(schema);
    }
  };
  return (req, res, next) => {
    req.validate = validate;
    next();
  };
};

const validateRequest = (schema) => {
  return (req, res, next) => {
    const toValidate = req.method === 'GET' ? req.params : req.body;
    const validate = req.validate(schema);
    if (validate(toValidate)) {
      next();
    } else {
      const msg = report(validate, `400: ${req.method} ${req.url}: `);
      req.log.clientInfo(msg);
      res.status(400).end();
    }
  };
};

/*
 Why the use the 'finish' event below?
 So that handlers can still terminate processing via .send(), .json() etc.
 Notes:
 - handlers must record body in res.locals
 - we can no longer change the response, so logging warnings only.
 */
const validateResponse = (schema) => {
  return (req, res, next) => {
    res.on('finish', () => {
      if (!res.locals.body) {
        req.log.error(`Missing local body for ${req.method} ${req.url}`);
        return;
      }
      const validate = req.validate(schema);
      if (!validate(res.locals.body)) {
        const msg = report(
          validate,
          'response invalid: ${req.method} ${req.url}: '
        );
        req.log.warn(msg);
      }
    });
    next();
  };
};

module.exports = {
  schemaValidator,
  validateRequest,
  validateResponse,
};
