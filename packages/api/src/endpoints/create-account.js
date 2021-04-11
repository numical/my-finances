const { SUPERUSER } = require('../roles');
const { createSchema, ACCOUNT, STRING } = require('../schemas');
const { version } = require('../../package.json');

const requestSchema = createSchema('create_account_request', {
  description: STRING,
});

const responseSchema = ACCOUNT;

const handler = async (req, res, next) => {
  try {
    const { body, dataStores } = req;
    const { description } = body;
    const { accounts } = dataStores;

    const lastUpdated = Date.now();

    const account = await accounts.create({
      entity: {
        description,
        lastUpdated,
        version,
      },
    });

    res.locals.body = account;
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'post',
  path: '/accounts',
  requiresAuth: true,
  handler,
  requestSchema,
  responseSchema,
  roles: [SUPERUSER],
};
