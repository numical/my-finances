const { version } = require('../../package.json');
const msg = `OK (v.${version})`

const handler = (req, res) => {
  res.status(200).send(msg);
};

module.exports = {
  verb: 'get',
  path: '/ping',
  handler,
};
