const config = require('../config');
const { cookie, generateJWT, generateSessionId } = require('../auth');
const { STRING, NUMBER } = require('../schemas');

const requestSchema = {
  properties: {
    userId: STRING,
    pwd: STRING,
  },
};

const responseSchema = {
  properties: {
    sessionId: STRING,
    timeout: NUMBER,
  },
};

const handler = async (req, res, next) => {
  try {
    const { userId, pwd } = req.body;
    const { users } = req.dataStores;

    const [user, sessionId] = await Promise.all([
      users.get(userId),
      generateSessionId(),
    ]);
    if (user) {
      if (pwd === user.pwd) {
        const maxAge = config.sessionTimeoutInSeconds * 1000;
        const body = {
          sessionId,
          timeout: Date.now() + maxAge,
        };
        const jwt = await generateJWT(body);
        res.cookie(cookie.name, jwt, { ...cookie.options, maxAge });
        res.locals.body = body;
        res.status(200).json(body);
      } else {
        req.log.clientInfo(
          `401: ${req.method} ${req.url}: password incorrect for userId '${userId}'`
        );
        res.status(401).end();
      }
    } else {
      req.log.clientInfo(
        `404: ${req.method} ${req.url}: unknown userId '${userId}'`
      );
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'post',
  path: '/sessions',
  handler,
  requiresAuth: false,
  requestSchema,
  responseSchema,
};
