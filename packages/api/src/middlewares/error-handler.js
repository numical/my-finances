module.exports = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const level = status >= 500 ? 'error' : 'warn';
  const { body, params, method } = req;
  const report = {
    status,
    args: method === 'GET' ? params : body,
    err,
  };
  req.log[level](report);
  if (res.headersSent) {
    return next(err);
  } else {
    res.status(status).end();
  }
};
