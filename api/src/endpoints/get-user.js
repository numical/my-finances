const { users } = require('../datastores');
const { BadRequest, NotFound } = require('../errors');

const handler = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new BadRequest('id missing');

    const user = await users.get(id);

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
  path: '/user/:id',
  handler,
};
