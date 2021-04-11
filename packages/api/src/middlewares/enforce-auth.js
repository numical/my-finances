const { SESSION_TOKEN } = require('my-finances-common').constants;
const { cookieConstants, extractJWT } = require('../auth');
const { allow, ...roles } = require('../roles');

const { COOKIE_NAME } = cookieConstants;

const fail = (req, res, status, message) => {
  req.log.clientInfo(`${status}: ${req.method} ${req.url}: ${message}`);
  res.status(status).end();
};

module.exports = (acceptedRoles) => async (req, res, next) => {
  const tokenId = req.get(SESSION_TOKEN);
  if (!tokenId) {
    return fail(req, res, 401, `No session token '${SESSION_TOKEN}'`);
  }
  const cookie = req.cookies[COOKIE_NAME];
  if (!cookie) {
    return fail(req, res, 401, `No cookie '${COOKIE_NAME}'`);
  }
  const jwt = await extractJWT(cookie);
  const { roles, sessionId, timeout } = jwt;
  if (tokenId !== sessionId) {
    return fail(
      req,
      res,
      401,
      `JWT sessionId '${sessionId}' does not match session token '${tokenId}'`
    );
  }
  const remainingSessionMs = timeout - Date.now();
  if (remainingSessionMs <= 0) {
    return fail(
      req,
      res,
      401,
      `JWT expired by ${Math.abs(remainingSessionMs)} milliseconds`
    );
  }

  if (acceptedRoles) {
    const commonRoles = acceptedRoles.filter((role) => roles.includes(role));
    if (!commonRoles.some((role) => allow[role](jwt, req.params))) {
      return fail(
        req,
        res,
        403,
        `Roles forbid operation; session roles ${roles} ;operation roles ${acceptedRoles}`
      );
    }
  }

  await next();
};
