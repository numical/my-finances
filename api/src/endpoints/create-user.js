const { users } = require('../datastores');
const { BadRequest } = require('../errors');

const handler = async (req, res, next) => {
  try {
    const { userId, email, pwd } = req.body;
    if (!userId) throw new BadRequest('userId missing');
    if (!email) throw new BadRequest('email missing');
    if (!pwd) throw new BadRequest('pwd missing');

    const exists = await users.get(userId);
    if (exists) {
      throw new BadRequest();
    }

    const user = await users.set(userId, {
      userId,
      email,
      pwd,
      keyStores: {
        default: '',
      },
    });

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'post',
  path: '/users',
  handler,
  requiresAuth: false,
};
