import version from '../util/index.mjs';

const message = `OK (v.${version})`;
const handler = (request, response) => {
  response.status(200).send(message);
};
export const verb = 'get';
export const path = '/ping';
export { handler };
export default {
  verb,
  path,
  handler,
};
