module.exports = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const level = status >= 500 ? 'error' : 'warn';
  const args = req.method === 'GET' ? req.params : req.body;
  const message = `${status}: ${req.method} ${req.url} ${JSON.stringify(
    args
  )}: ${err.message}`;
  req.log[level](message, err);
  if (res.headersSent) {
    return next(err);
  } else {
    res.status(status).end();
  }
};
