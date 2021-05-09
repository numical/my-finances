import roles from '../roles/index.mjs';
import { MODEL } from '../schemas/index.mjs';

const { ACCOUNT_ADMIN, PERSONAL, SUPERUSER } = roles;
const handler = async (request, response, next) => {
  try {
    const { dataStores, params } = request;
    const { accountId, modelId, userId } = params;
    const { models } = dataStores;
    const model = await models.get([accountId, userId, modelId]);
    response.locals.body = model;
    response.status(200).json(model);
  } catch (error) {
    next(error);
  }
};
export const verb = 'get';
export const path = '/account/:accountId/user/:userId/models/:modelId';
export { handler };
export { MODEL as responseSchema };
export default {
  verb,
  path,
  handler,
  responseSchema: MODEL,
  roles: [SUPERUSER, ACCOUNT_ADMIN, PERSONAL],
};
