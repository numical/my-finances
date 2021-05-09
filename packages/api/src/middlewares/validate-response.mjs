export default (schema) => {
  return (request, response, next) => {
    response.on('finish', () => {
      if (response.statusCode === 200) {
        if (response.locals.body) {
          const errors = request.enforceSchemaFn(schema, response.locals.body);
          if (errors) {
            request.log.warn(
              `response invalid: ${request.method} ${request.url}: ${errors}`
            );
          }
        } else {
          request.log.error(
            `Missing local body for ${request.method} ${request.url}`
          );
        }
      }
    });
    next();
  };
};
