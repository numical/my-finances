import roles from '../roles/index.mjs';

const { PERSONAL } = roles;
const handler = async (request, response, next) => {
  try {
    const { dataStores, params } = request;
    const { accountId, modelId, userId } = params;
    const { models } = dataStores;
    await models.del({ ids: [accountId, userId, modelId] });
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};
export const verb = 'delete';
export const path = '/account/:accountId/user/:userId/models/:modelId';
export { handler };
export default {
  verb,
  path,
  handler,
  roles: [PERSONAL],
};
