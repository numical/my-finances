module.exports = (schema) => {
  return (req, res, next) => {
    const toValidate = req.method === 'GET' ? req.params : req.body;
    const errors = req.enforceSchema(schema, toValidate);
    if (errors) {
      req.log.clientInfo(`400: ${req.method} ${req.url}: ${errors}`);
      res.status(400).end();
    } else {
      next();
    }
  };
};