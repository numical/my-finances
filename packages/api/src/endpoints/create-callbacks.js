const {
  enforceAuth,
  validateRequest,
  validateResponse,
} = require('../middlewares');

module.exports = (endpoint, schemaValidator) => {
  const { handler, requiresAuth, requestSchema, responseSchema } = endpoint;
  const callbacks = [];
  if (requiresAuth) {
    callbacks.push(enforceAuth);
  }
  if (requestSchema) {
    callbacks.push(validateRequest(schemaValidator, requestSchema));
  }
  if (responseSchema) {
    callbacks.push(validateResponse(schemaValidator, responseSchema));
  }
  callbacks.push(handler);
  return callbacks;
};
