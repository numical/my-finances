const { users } = require('../datastores');
const { cookie, generateJWT, generateSessionId } = require('../auth');
const { BadRequest, NotFound, Unauthorised } = require('../errors');

const handler = async (req, res, next) => {
  try {
    const { userId, pwd } = req.body;
    if (!userId) throw new BadRequest('userId missing');
    if (!pwd) throw new BadRequest('pwd missing');

    const [user, sessionId] = await Promise.all([
      users.get(userId),
      generateSessionId(),
    ]);
    if (user) {
      if (pwd === user.pwd) {
        const body = {
          sessionId,
          timeout: Date.now() + cookie.maxAge,
          userId,
        };
        const jwt = await generateJWT(body);
        res.cookie(cookie.name, jwt, cookie.options);
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
