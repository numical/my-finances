const { set } = require('../datastores/users');
const { BadRequest } = require('../errors');

const handler = (req, res) => {
  const { id, email, pwd } = req.body;
  if (!id) throw new BadRequest('id missing');
  if (!email) throw new BadRequest('email missing');
  if (!pwd) throw new BadRequest('pwd missing');

  const user = set(id, {
    id,
    email,
    pwd,
  });

  res.status(200).send(user);
};

module.exports = {
  verb: 'post',
  path: '/user',
  handler,
};
