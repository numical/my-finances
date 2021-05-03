const { SESSION_TOKEN } = require('my-finances-common').constants;
const { cookieConstants, extractJWT } = require('../auth');
const { allow, ...roles } = require('../roles');

const { COOKIE_NAME } = cookieConstants;

const fail = (request, response, status, message) => {
  request.log.clientInfo(
    `${status}: ${request.method} ${request.url}: ${message}`
  );
  response.status(status).end();
};

module.exports = (endpointRoles) => async (request, response, next) => {
  // missing auth data
  const tokenId = request.get(SESSION_TOKEN);
  if (!tokenId) {
    return fail(request, response, 401, `No session token '${SESSION_TOKEN}'`);
  }
  const cookie = request.cookies[COOKIE_NAME];
  if (!cookie) {
    return fail(request, response, 401, `No cookie '${COOKIE_NAME}'`);
  }

  // consistent auth data
  const jwt = await extractJWT(cookie);
  const { roles: sessionRoles, sessionId, timeout } = jwt;
  if (tokenId !== sessionId) {
    return fail(
      request,
      response,
      401,
      `JWT sessionId '${sessionId}' does not match session token '${tokenId}'`
    );
  }

  // timeout
  const remainingSessionMs = timeout - Date.now();
  if (remainingSessionMs <= 0) {
    return fail(
      request,
      response,
      401,
      `JWT expired by ${Math.abs(remainingSessionMs)} milliseconds`
    );
  }

  // authorisation
  response.locals.roles = endpointRoles
    .filter((role) => sessionRoles.includes(role))
    .filter((role) => allow[role](jwt, request.params));
  if (response.locals.roles.length === 0) {
    return fail(
      request,
      response,
      403,
      `Roles forbid operation; session roles ${roles} ;endpoint roles ${endpointRoles}`
    );
  }

  await next();
};
