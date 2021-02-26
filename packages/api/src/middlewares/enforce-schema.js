const report = require('./report-validation-errors');

const validateRequest = (validator, schema) => {
  const validate = validator.compile(schema);
  return (req, res, next) => {
    const toValidate = req.method === 'GET' ? req.params : req.body;
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
const validateResponse = (validator, schema) => {
  const validate = validator.compile(schema);
  return (req, res, next) => {
    res.on('finish', () => {
      if (!res.locals.body) {
        req.log.error(`Missing local body for ${req.method} ${req.url}`);
      } else if (!validate(res.locals.body)) {
        const msg = report(validate, 'response invalid: ${req.method} ${req.url}: ');
        req.log.warn(msg);
      }
    });
    next();
  };
};

module.exports = {
  validateRequest,
  validateResponse,
};
