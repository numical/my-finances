module.exports = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const level = status >= 500 ? 'error' : 'warn';
  req.log[level](err);
  if (res.headersSent) {
    return next(err);
  } else {
    res.status(status).end();
  }
};
