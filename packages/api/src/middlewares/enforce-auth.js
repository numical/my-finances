const { SESSION_TOKEN } = require('my-finances-common');
const { cookie, extractJWT } = require('../auth');

const wrapRequest = (req, next) => Promise.resolve({ req, next });

const checkHeaderExists = async (args) => {
  const { req } = args;
  const sessionId = req.get(SESSION_TOKEN);
  if (sessionId) {
    return {
      ...args,
      sessionId,
    };
  } else {
    throw new Error(`No session token '${SESSION_TOKEN}'`);
  }
};

const checkCookieExists = async (args) => {
  const { req } = args;
  const token = req.cookies[cookie.name];
  if (token) {
    return {
      ...args,
      token,
    };
  } else {
    throw new Error(`No cookie '${cookie.name}'`);
  }
};

const extractPayload = (args) => {
  const { token } = args;
  return extractJWT(token).then((payload) => ({
    ...args,
    payload,
  }));
};

const assertSessionIds = async (args) => {
  const { payload, sessionId } = args;
  if (sessionId == payload.sessionId) {
    return args;
  } else {
    throw new Error(
      `JWT sessionId '${payload.sessionId}' does not match session token '${sessionId}'`
    );
  }
};

const authorised = async (args) => {
  const { next } = args;
  next();
};

module.exports = (req, res, next) => {
  wrapRequest(req, next)
    .then(checkHeaderExists)
    .then(checkCookieExists)
    .then(extractPayload)
    .then(assertSessionIds)
    .then(authorised)
    .catch((err) => {
      req.log.clientInfo(`401: ${req.method} ${req.url}: ${err.message}`);
      res.status(401).end();
    });
};
