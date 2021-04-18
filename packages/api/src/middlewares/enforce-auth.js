const { SESSION_TOKEN } = require('my-finances-common').constants;
const { cookieConstants, extractJWT } = require('../auth');
const { allow, ...roles } = require('../roles');

const { COOKIE_NAME } = cookieConstants;

const fail = (req, res, status, message) => {
  req.log.clientInfo(`${status}: ${req.method} ${req.url}: ${message}`);
  res.status(status).end();
};

module.exports = (endpointRoles) => async (req, res, next) => {
  // missing auth data
  const tokenId = req.get(SESSION_TOKEN);
  if (!tokenId) {
    return fail(req, res, 401, `No session token '${SESSION_TOKEN}'`);
  }
  const cookie = req.cookies[COOKIE_NAME];
  if (!cookie) {
    return fail(req, res, 401, `No cookie '${COOKIE_NAME}'`);
  }

  // consistent auth data
  const jwt = await extractJWT(cookie);
  const { roles: sessionRoles, sessionId, timeout } = jwt;
  if (tokenId !== sessionId) {
    return fail(
      req,
      res,
      401,
      `JWT sessionId '${sessionId}' does not match session token '${tokenId}'`
    );
  }

  // timeout
  const remainingSessionMs = timeout - Date.now();
  if (remainingSessionMs <= 0) {
    return fail(
      req,
      res,
      401,
      `JWT expired by ${Math.abs(remainingSessionMs)} milliseconds`
    );
  }

  // authorisation
  res.locals.roles = endpointRoles
    .filter((role) => sessionRoles.includes(role))
    .filter((role) => allow[role](jwt, req.params));
  if (res.locals.roles.length === 0) {
    return fail(
      req,
      res,
      403,
      `Roles forbid operation; session roles ${roles} ;endpoint roles ${endpointRoles}`
    );
  }

  await next();
};
