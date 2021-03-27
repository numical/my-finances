/*
 Why the use the 'finish' event below?
 So that handlers can still terminate processing via .send(), .json() etc.
 Notes:
 - handlers must record body in res.locals
 - we can no longer change the response, so logging warnings only.
 */
module.exports = (schema) => {
  return (req, res, next) => {
    res.on('finish', () => {
      if (res.locals.body) {
        const errors = req.enforceSchemaFn(schema, res.locals.body);
        if (errors) {
          req.log.warn(`response invalid: ${req.method} ${req.url}: ${errors}`);
        }
      } else {
        req.log.error(`Missing local body for ${req.method} ${req.url}`);
      }
    });
    next();
  };
};
