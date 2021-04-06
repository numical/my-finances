const { DEFAULT } = require('my-finances-common');
const { createSchema, EMAIL, HASH, STRING, USER } = require('../schemas');
const { version } = require('../../package.json');

const requestSchema = createSchema('create_user_request', {
  authId: HASH,
  email: EMAIL,
  pwd: STRING,
});

const responseSchema = USER;

const handler = async (req, res, next) => {
  try {
    const { body, dataStores, params } = req;
    const { authId, email, pwd } = body;
    const { users, models } = dataStores;
    const { accountId } = params;

    /*
     * Belt'n'braces: authId is a function of email so do not
     * really need to test both.
     */
    const counts = await Promise.all([
      users.count({ criteria: { authId }, parentIds: [accountId] }),
      users.count({ criteria: { email }, parentIds: [accountId] }),
    ]);
    if (counts[0] > 0) {
      res.status(400).send(`Auth id ${authId} already in use.`).end();
      return;
    }
    if (counts[1] > 0) {
      res.status(400).send(`Email address ${email} already in use.`).end();
      return;
    }

    const lastUpdated = Date.now();

    const user = await users.create({
      entity: {
        authId,
        email,
        pwd,
        lastUpdated,
        version,
      },
      parentIds: [accountId],
    });

    const model = await models.create({
      entity: {
        data: '',
        description: DEFAULT,
        lastUpdated,
        version,
      },
      parentIds: [accountId, user.id],
    });

    user.models = {
      [DEFAULT]: model,
    };

    res.locals.body = user;
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'post',
  path: '/account/:accountId/users',
  handler,
  requiresAuth: false,
  requestSchema,
  responseSchema,
};
