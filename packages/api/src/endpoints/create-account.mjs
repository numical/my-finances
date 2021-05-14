import { roles } from '../roles/index.mjs';
import { ACCOUNT, STRING, createSchema } from '../schemas/index.mjs';

import { addCreatedFields } from './util/index.mjs';

const { SUPERUSER } = roles;
const requestSchema = createSchema({
  id: 'create_account_request',
  properties: {
    description: STRING,
  },
});
const responseSchema = ACCOUNT;
const handler = async (request, response, next) => {
  try {
    const { body, dataStores } = request;
    const { description } = body;
    const { accounts } = dataStores;
    const account = await accounts.create({
      entity: addCreatedFields({
        description,
      }),
    });
    response.locals.body = account;
    response.status(200).json(account);
  } catch (error) {
    next(error);
  }
};

export default {
  verb: 'post',
  path: '/accounts',
  handler,
  requestSchema,
  responseSchema,
  roles: [SUPERUSER],
};
