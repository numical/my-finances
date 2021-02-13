const { users } = require('../datastores');
const { BadRequest, NotFound } = require('../errors');

const handler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) throw new BadRequest('userId missing');

    const user = await users.get(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      throw new NotFound();
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
};
