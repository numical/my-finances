export default (error, request, response, next) => {
  const status = error.status || error.statusCode || 500;
  const level = status >= 500 ? 'error' : 'warn';
  const { body, log, method, params } = request;
  const report = {
    status,
    args: method === 'GET' ? params : body,
    err: error,
  };
  log[level](report);
  if (response.headersSent) {
    return next(error);
  } else {
    response.status(status).end();
  }
};
