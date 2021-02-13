const { config, users } = require('../datastores');
const { cookie, generateJWT, generateSessionId } = require('../auth');
const { BadRequest, NotFound, Unauthorised } = require('../errors');

const handler = async (req, res, next) => {
  try {
    const { userId, pwd } = req.body;
    if (!userId) throw new BadRequest('userId missing');
    if (!pwd) throw new BadRequest('pwd missing');

    const [user, sessionId, sessionTimeoutInSeconds] = await Promise.all([
      users.get(userId),
      generateSessionId(),
      config.get('sessionTimeoutInSeconds'),
    ]);
    if (user) {
      if (pwd === user.pwd) {
        const maxAge = sessionTimeoutInSeconds * 1000;
        const body = {
          sessionId,
          timeout: Date.now() + maxAge,
        };
        const jwt = await generateJWT(body);
        res.cookie(cookie.name, jwt, { ...cookie.options, maxAge });
        res.status(200).json(body);
      } else {
        throw new Unauthorised();
      }
    } else {
      throw new NotFound();
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
};
