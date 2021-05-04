const { DEFAULT } = require('my-finances-common').constants;
const { addCreatedFields } = require('./standard-fields');

module.exports = async ({ accountId, next, req, res, roles }) => {
  try {
    const { body, dataStores } = req;
    const { authId, description, email, pwd } = body;
    const { models, users } = dataStores;

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
      entity: addCreatedFields({
        authId,
        description,
        email,
        pwd,
        accountId,
        roles,
      }),
      parentIds: [accountId],
    });

    const model = await models.create({
      entity: addCreatedFields({
        data: '',
        description: DEFAULT,
      }),
      parentIds: [accountId, user.id],
    });

    user.models = {
      [DEFAULT]: model,
    };

    res.locals.body = user;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
