const config = require('../config');
const { cookieConstants, generateJWT, generateSessionId } = require('../auth');
const { createSchema, HASH, NUMBER, STRING, UUID } = require('../schemas');

const { COOKIE_NAME, COOKIE_OPTIONS } = cookieConstants;

const requestSchema = createSchema('create_session_request', {
  authId: HASH,
  pwd: STRING,
});

const responseSchema = createSchema('create_session_response', {
  sessionId: UUID,
  timeout: NUMBER,
});

const handler = async (req, res, next) => {
  try {
    const { body, dataStores } = req;
    const { authId, pwd } = body;
    const { users } = dataStores;

    const [existingUsers, sessionId] = await Promise.all([
      users.search({ criteria: { authId } }),
      generateSessionId(),
    ]);
    switch (existingUsers.length) {
      case 0:
        req.log.clientInfo(
          `400: ${req.method} ${req.url}: unknown user auth id '${authId}'`
        );
        res.status(400).end();
        break;
      case 1:
        const user = existingUsers[0];
        if (pwd === user.pwd) {
          const maxAge = config.sessionTimeoutInSeconds * 1000;
          const body = {
            accountId: user.accountId,
            roles: user.roles,
            sessionId,
            timeout: Date.now() + maxAge,
            userId: user.id,
          };
          const jwt = await generateJWT(body);
          res.cookie(COOKIE_NAME, jwt, { ...COOKIE_OPTIONS, maxAge });
          res.locals.body = body;
          res.status(200).json(body);
        } else {
          req.log.clientInfo(
            `401: ${req.method} ${req.url}: password incorrect for auth id '${id}'`
          );
          res.status(401).end();
        }
        break;
      default:
        req.log.error(
          `500: ${req.method} ${req.url}: multiple records for auth id '${id}'`
        );
        res.status(500).end();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'post',
  path: '/sessions',
  requiresAuth: false,
  handler,
  requestSchema,
  responseSchema,
};
