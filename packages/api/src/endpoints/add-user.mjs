import roles from '../roles/index.mjs';
import {
  EMAIL,
  HASH,
  ROLES,
  STRING,
  USER,
  createSchema,
} from '../schemas/index.mjs';

import { newUserHandler } from './util/index.mjs';

const { ACCOUNT_ADMIN, SUPERUSER } = roles;
const requestSchema = createSchema({
  id: 'add_user_request',
  properties: {
    authId: HASH,
    email: EMAIL,
    pwd: STRING,
    description: STRING,
    roles: ROLES,
  },
});
const responseSchema = USER;
const handler = async (request, response, next) => {
  const { body, params } = request;
  const { roles } = body;
  const { accountId } = params;
  return newUserHandler({
    accountId,
    roles,
    req: request,
    res: response,
    next,
  });
};
export const verb = 'post';
export const path = '/account/:accountId/users';
export { handler };
export { requestSchema };
export { responseSchema };
export default {
  verb,
  path,
  handler,
  requestSchema,
  responseSchema,
  roles: [SUPERUSER, ACCOUNT_ADMIN],
};
