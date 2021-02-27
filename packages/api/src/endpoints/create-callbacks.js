const {
  enforceAuth,
  validateRequest,
  validateResponse,
} = require('../middlewares');

module.exports = (endpoint) => {
  const { handler, requiresAuth, requestSchema, responseSchema } = endpoint;
  const callbacks = [];
  if (requiresAuth) {
    callbacks.push(enforceAuth);
  }
  if (requestSchema) {
    callbacks.push(validateRequest(requestSchema));
  }
  if (responseSchema) {
    callbacks.push(validateResponse(responseSchema));
  }
  callbacks.push(handler);
  return callbacks;
};
