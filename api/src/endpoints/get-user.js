const { get } = require('../datastores/users');
const { BadRequest, NotFound } = require('../errors');

const handler = (req, res) => {
  const { id } = req.params;
  if (!id) throw new BadRequest('id missing');

  const user = get(id);

  if (user) {
    res.status(200).send(user);
  } else {
    throw new NotFound();
  }
};

module.exports = {
  verb: 'get',
  path: '/user/:id',
  handler,
};
