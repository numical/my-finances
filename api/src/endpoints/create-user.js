const { users } = require('../datastores');
const { BadRequest } = require('../errors');

const handler = async (req, res, next) => {
  try {
    const { id, email, pwd } = req.body;
    if (!id) throw new BadRequest('id missing');
    if (!email) throw new BadRequest('email missing');
    if (!pwd) throw new BadRequest('pwd missing');

    const exists = await users.get(id);
    if (exists) {
      throw new BadRequest();
    }

    const user = await users.set(id, {
      id,
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
};
