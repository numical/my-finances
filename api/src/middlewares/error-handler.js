module.exports = (err, req, res) => {
  const status = err.status || err.statusCode || 500;
  const level = status >= 500 ? 'error' : 'warn';
  req.log[level](err);
  res.status(status).end();
};
