import { v4 as uuidv4 } from 'uuid';
const { users } = require('../datastores');
const { BadRequest, NotFound, Unauthorised } = require('../errors');

const generateToken = (userId, { sessionId, timeout }) => {
  return '123';
};

const cookieOptions = (maxAge) => ({
  maxAge,
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
});

const handler = async (req, res, next) => {
  try {
    const { userId, pwd } = req.body;
    if (!userId) throw new BadRequest('userId missing');
    if (!pwd) throw new BadRequest('pwd missing');

    const user = await users.get(userId);
    if (user) {
      if (pwd === user.pwd) {
        const maxAge = 10 * 60 * 1000;
        const body = {
          sessionId: uuidv4(),
          timeout: Date.now() + maxAge,
        };
        const token = generateToken(userId, body);
        res.cookie('my-finances-session', token, cookieOptions(maxAge));
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
