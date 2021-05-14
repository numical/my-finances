import { version } from '../util/index.mjs';

const message = `OK (v.${version})`;
const handler = (request, response) => {
  response.status(200).send(message);
};

export default {
  verb: 'get',
  path: '/ping',
  handler,
};
