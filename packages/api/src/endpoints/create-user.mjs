import myFinancesCommon from 'my-finances-common';

import roles from '../roles/index.mjs';
import { EMAIL, HASH, STRING, USER, createSchema } from '../schemas/index.mjs';

import { newUserHandler } from './util/index.mjs';

const { PERSONAL_ACCOUNTS } = myFinancesCommon.constants;
const { PERSONAL } = roles;
const requestSchema = createSchema({
  id: 'create_user_request',
  properties: {
    authId: HASH,
    description: STRING,
    email: EMAIL,
    pwd: STRING,
  },
});
const responseSchema = USER;
const handler = async (request, response, next) =>
  newUserHandler({
    accountId: PERSONAL_ACCOUNTS,
    roles: [PERSONAL],
    req: request,
    res: response,
    next,
  });
export const verb = 'post';
export const path = '/account/personal/users';
export { handler };
export { requestSchema };
export { responseSchema };
export default {
  verb,
  path,
  handler,
  requestSchema,
  responseSchema,
};
