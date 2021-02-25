const { users } = require('../datastores');
const { BadRequest } = require('../errors');

const requestSchema = {
  properties: {
    userId: { type: 'string' },
    email: { type: 'string' },
    pwd: { type: 'string' },
  },
};

const responseSchema = {
  properties: {
    userId: { type: 'string' },
    email: { type: 'string' },
    pwd: { type: 'string' }
  },
};

const handler = async (req, res, next) => {
  try {
    const { userId, email, pwd } = req.body;

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
  requestSchema,
  responseSchema
};
