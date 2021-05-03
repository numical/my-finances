const { version } = require('../../package.json');
const message = `OK (v.${version})`;

const handler = (request, response) => {
  response.status(200).send(message);
};

module.exports = {
  verb: 'get',
  path: '/ping',
  handler,
};
