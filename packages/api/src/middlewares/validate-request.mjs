export default (schema) => {
  return (request, response, next) => {
    const toValidate = request.method === 'GET' ? request.params : request.body;
    const errors = request.enforceSchemaFunction(schema, toValidate);
    if (errors) {
      request.log.clientInfo(
        `400: ${request.method} ${request.url}: ${errors}`
      );
      response.status(400).end();
    } else {
      next();
    }
  };
};
