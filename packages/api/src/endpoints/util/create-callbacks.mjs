import {
  enforceAuth,
  validateRequest,
  validateResponse,
} from '../../middlewares/index.mjs';

export default ({ config, endPoint }) => {
  const { handler, requestSchema, responseSchema, roles } = endPoint;
  const callbacks = [];
  if (roles) {
    callbacks.push(enforceAuth(roles));
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
