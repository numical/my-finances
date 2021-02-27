const {
  enforceAuth,
  validateRequest,
  validateResponse,
} = require('../middlewares');

module.exports = ({ config, endPoint }) => {
  const { handler, requiresAuth, requestSchema, responseSchema } = endPoint;
  const callbacks = [];
  if (requiresAuth) {
    callbacks.push(enforceAuth);
  }
  if (requestSchema && config.validate.request) {
    callbacks.push(validateRequest(requestSchema));
  }
  if (responseSchema && config.validate.response) {
    callbacks.push(validateResponse(responseSchema));
  }
  callbacks.push(handler);
  return callbacks;
};