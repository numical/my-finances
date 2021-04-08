const { SESSION_TOKEN } = require('my-finances-common');
const { cookieConstants, extractJWT } = require('../auth');
const { ANY } = require('../roles');

const { COOKIE_NAME } = cookieConstants;

module.exports = (roles) => async (req, res, next) => {
  try {
    const sessionId = req.get(SESSION_TOKEN);
    if (!sessionId) {
      throw new Error(`No session token '${SESSION_TOKEN}'`);
    }
    const cookie = req.cookies[COOKIE_NAME];
    if (!cookie) {
      throw new Error(`No cookie '${COOKIE_NAME}'`);
    }
    const jwt = await extractJWT(cookie);
    if (sessionId !== jwt.sessionId) {
      throw new Error(
        `JWT sessionId '${jwt.sessionId}' does not match session token '${sessionId}'`
      );
    }
    if (roles !== ANY && !roles.find((role) => jwt.roles.includes(role))) {
      throw new Error(
        `Session roles ${jwt.roles} do not match operation roles ${roles}`
      );
    }
    await next();
  } catch (err) {
    req.log.clientInfo(`401: ${req.method} ${req.url}: ${err.message}`);
    res.status(401).end();
  }
};
