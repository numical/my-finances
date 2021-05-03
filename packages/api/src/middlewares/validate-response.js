/*
 Why the use the 'finish' event below?
 So that handlers can still terminate processing via .send(), .json() etc.
 Notes:
 - handlers must record body in res.locals
 - we can no longer change the response, so logging warnings only.
 */
module.exports = (schema) => {
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
