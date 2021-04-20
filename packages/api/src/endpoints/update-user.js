const { array, object } = require('../util');
const { SUPERUSER, ACCOUNT_ADMIN, PERSONAL } = require('../roles');
const {
  createSchema,
  DICTIONARY,
  EMAIL,
  HASH,
  STRING,
  USER,
} = require('../schemas');
const { addUpdatedFields } = require('./util');

const requestSchema = createSchema({
  allRequired: false,
  id: 'update_user_request',
  properties: {
    authId: HASH,
    email: EMAIL,
    pwd: STRING,
    models: DICTIONARY,
  },
});

const responseSchema = USER;

const handler = async (req, res, next) => {
  try {
    const { body, dataStores, log, params } = req;
    const { accountId, userId } = params;
    const { users, models } = dataStores;
    const { locals } = res;
    const { roles: sessionRoles } = locals;

    // check session user auth
    if (body.pwd || body.models) {
      if (!sessionRoles.includes(PERSONAL)) {
        log.clientInfo(
          `403: ${req.method} ${req.url}: only PERSONAL role can update password and models.`
        );
        res.status(403).end();
        return;
      }
    }

    // fire off retrievals
    const fetchUser = users.get([accountId, userId]);
    const fetchModels = models.search({ parentIds: [accountId, userId] });

    // calculate diff (note: if models passed - always included)
    const user = await fetchUser;
    const updatedFields = object.diff(body, user);
    const { authId, email, pwd, models: passedModels } = updatedFields;

    // ensure field consistencies
    if (authId || email) {
      if (!authId) {
        res.status(400).send('authId required if changing email').end();
        return;
      }
      if (!email) {
        res.status(400).send('email required if changing authId').end();
        return;
      }
    }
    if (pwd || passedModels) {
      if (!pwd) {
        res
          .status(400)
          .send('models alone cannot be updated via this endpoint')
          .end();
        return;
      }
      if (!passedModels) {
        res.status(400).send('models required if changing password.').end();
        return;
      } else {
        const existingModels = await fetchModels;
        const existingIds = existingModels.map((model) => model.id).sort();
        const passedIds = Object.values(passedModels)
          .map((model) => model.id)
          .sort();
        if (!array.isScalarEqual(passedIds, existingIds)) {
          res
            .status(400)
            .send(`passed models do not match user's models`)
            .end();
          return;
        }
      }
    }

    // transactional
    const toUpdate = object.extractTruthy(updatedFields);
    if (!object.isEmpty(toUpdate)) {
      const entity = addUpdatedFields(toUpdate);
      users.startAtomic();
      users.update({ entity, ids: [accountId, userId] });
      if (passedModels) {
        Object.values(passedModels).forEach((model) => {
          const entity = addUpdatedFields(model);
          models.update({ entity, ids: [accountId, userId, model.id] });
        });
      }
      await users.commitAtomic();
    }
    res.status(200).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'patch',
  path: '/account/:accountId/user/:userId/',
  handler,
  requestSchema,
  responseSchema,
  roles: [SUPERUSER, ACCOUNT_ADMIN, PERSONAL],
};
