const { SUPERUSER } = require('../roles');
const { createSchema, ACCOUNT, STRING } = require('../schemas');
const { addCreatedFields } = require('./util');

const requestSchema = createSchema({
  id: 'create_account_request',
  properties: {
    description: STRING,
  },
});

const responseSchema = ACCOUNT;

const handler = async (req, res, next) => {
  try {
    const { body, dataStores } = req;
    const { description } = body;
    const { accounts } = dataStores;

    const created = Date.now();
    const lastUpdated = created;

    const account = await accounts.create({
      entity: addCreatedFields({
        description,
      }),
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
  handler,
  requestSchema,
  responseSchema,
  roles: [SUPERUSER],
};
