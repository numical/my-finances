const { STRING, USER } = require('../schemas');

const requestSchema = {
  properties: {
    userId: STRING,
    email: STRING,
    pwd: STRING,
  },
};

const responseSchema = USER;

const handler = async (req, res, next) => {
  try {
    const { userId, email, pwd } = req.body;
    const { users } = req.dataStores;

    const exists = await users.get(userId);
    if (exists) {
      res.status(400).end();
      return;
    }

    const user = await users.create(userId, {
      userId,
      email,
      pwd,
      keyStores: [],
    });

    res.locals.body = user;
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
  responseSchema,
};
