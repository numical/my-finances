const { STRING, USER } = require('../schemas');

const requestSchema = {
  properties: {
    userId: STRING,
  },
};

const responseSchema = USER;

const handler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { users } = req.dataStores;

    const [user] = await users.search({ userId });

    if (user) {
      res.locals.body = user;
      res.status(200).json(user);
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
  verb: 'get',
  path: '/user/:userId',
  handler,
  requiresAuth: true,
  requestSchema,
  responseSchema,
};
