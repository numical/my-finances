import roles from '../roles/index.mjs';
import { MODEL } from '../schemas/index.mjs';

import { addUpdatedFields } from './util/index.mjs';

const { PERSONAL } = roles;
const handler = async (request, response, next) => {
  try {
    const { body: model, dataStores, params } = request;
    const { accountId, modelId, userId } = params;
    const { models } = dataStores;
    const entity = addUpdatedFields(model);
    models.update({ entity, ids: [accountId, userId, modelId] });
    response.status(200).end();
  } catch (error) {
    next(error);
  }
};
export const verb = 'put';
export const path = '/account/:accountId/user/:userId/models/:modelId';
export { handler };
export { MODEL as requestSchema };
export default {
  verb,
  path,
  handler,
  requestSchema: MODEL,
  roles: [PERSONAL],
};
