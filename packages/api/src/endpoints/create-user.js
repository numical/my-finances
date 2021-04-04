const { DEFAULT } = require('my-finances-common');
const { baseObject, EMAIL, HASH, STRING, USER } = require('../schemas');

const requestSchema = {
  ...baseObject('create_user_request'),
  properties: {
    authId: HASH,
    email: EMAIL,
    pwd: STRING,
  },
};
const responseSchema = USER;

const handler = async (req, res, next) => {
  try {
    const { authId, email, pwd } = req.body;
    const { users, models } = req.dataStores;

    /*
     * Belt'n'braces: authId is a function of email so do not
     * really need to test both.
     */
    const counts = await Promise.all([
      users.count({ criteria: { authId } }),
      users.count({ criteria: { email } }),
    ]);
    if (counts[0] > 0) {
      res.status(400).send(`Auth id ${authId} already in use.`).end();
      return;
    }
    if (counts[1] > 0) {
      res.status(400).send(`Email address ${email} already in use.`).end();
      return;
    }

    const user = await users.create({
      entity: {
        authId,
        email,
        pwd,
        models: {
          [DEFAULT]: {},
        },
      },
    });

    const model = await models.create({
      entity: {
        data: '',
        description: DEFAULT,
      },
      parentIds: [user.id],
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
  path: '/users',
  handler,
  requiresAuth: false,
  requestSchema,
  responseSchema,
};
