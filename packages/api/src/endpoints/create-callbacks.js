const { enforceAuth, validateRequest, validateResponse } = require('../middlewares');

module.exports = (endpoint, schemaValidator) => {
  const { handler, requiresAuth, requestSchema, responseSchema} = endpoint;
  const callbacks = [];
  if(requiresAuth) {
    callbacks.push(enforceAuth)
  }
  if (requestSchema) {
    callbacks.push(validateRequest(schemaValidator, requestSchema));
  }
  callbacks.push(handler);
  if (responseSchema) {
    callbacks.push(validateResponse(schemaValidator, responseSchema));
  }
  return callbacks;
}
