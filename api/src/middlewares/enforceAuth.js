const { SESSION_TOKEN } = require('my-finances-common');
const { cookie, extractJWT } = require('../auth');
const { Unauthorised } = require('../errors');

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
    throw new Error();
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
    throw new Error();
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
    throw new Error();
  }
};

const authorised = async (args) => {
  const { next } = args;
  next();
};

module.exports = (req, res, next) => {
  wrapRequest(req, next)
    .then(checkCookieExists)
    .then(checkHeaderExists)
    .then(extractPayload)
    .then(assertSessionIds)
    .then(authorised)
    .catch((err) => {
      next(new Unauthorised());
    });
};
