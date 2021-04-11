const { DEFAULT } = require('my-finances-common').constants;
const { version } = require('../../package.json');

module.exports = async ({ accountId, next, req, res, roles }) => {
  try {
    const { body, dataStores } = req;
    const { authId, email, pwd } = body;
    const { users, models } = dataStores;

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

    const lastUpdated = Date.now();

    const user = await users.create({
      entity: {
        authId,
        email,
        pwd,
        accountId,
        roles,
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
