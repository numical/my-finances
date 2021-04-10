const { SESSION_TOKEN } = require('my-finances-common').constants;
const { cookieConstants, extractJWT } = require('../auth');
const { allow, ...roles } = require('../roles');

const { COOKIE_NAME } = cookieConstants;

module.exports = (acceptedRoles) => async (req, res, next) => {
  try {
    const tokenId = req.get(SESSION_TOKEN);
    if (!tokenId) {
      throw new Error(`No session token '${SESSION_TOKEN}'`);
    }
    const cookie = req.cookies[COOKIE_NAME];
    if (!cookie) {
      throw new Error(`No cookie '${COOKIE_NAME}'`);
    }
    const jwt = await extractJWT(cookie);
    const { roles, sessionId, timeout } = jwt;
    if (tokenId !== sessionId) {
      throw new Error(
        `JWT sessionId '${sessionId}' does not match session token '${tokenId}'`
      );
    }
    const remainingSessionMs = timeout - Date.now();
    if (remainingSessionMs <= 0) {
      throw new Error(
        `JWT expired by ${Math.abs(remainingSessionMs)} milliseconds`
      );
    }

    if (acceptedRoles) {
      const commonRoles = acceptedRoles.filter((role) => roles.includes(role));
      if (!commonRoles.some((role) => allow[role](jwt, req.params))) {
        throw new Error(
          `Roles forbid operation; session roles ${roles} ;operation roles ${acceptedRoles}`
        );
      }
    }

    await next();
  } catch (err) {
    req.log.clientInfo(`401: ${req.method} ${req.url}: ${err.message}`);
    res.status(401).end();
  }
};
