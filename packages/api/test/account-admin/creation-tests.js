const { SESSION_TOKEN } = require('my-finances-common').constants;

const canCreateSession = ({ api, user }) => async (t) => {
  const { status, body, headers } = await api
    .post('/sessions')
    .send(user.credentials);

  t.equal(status, 200, 'session should be created');

  user.sessionHeaders = {
    [SESSION_TOKEN]: body.sessionId,
    Cookie: headers['set-cookie'],
  };
  t.end();
};

const cannotCreateAccount = ({
  api,
  user,
  accountToCreate,
  expectedStatus,
}) => async (t) => {
  const { fields } = accountToCreate;
  const { status } = await api
    .post('/accounts')
    .set(user.sessionHeaders)
    .send(fields);

  t.equal(status, expectedStatus, 'account should not be created');

  t.end();
};

const canCreateAccount = ({ api, user, accountToCreate }) => async (t) => {
  const { fields } = accountToCreate;
  const { status, body } = await api
    .post('/accounts')
    .set(user.sessionHeaders)
    .send(fields);

  t.equal(status, 200, 'account should be created');
  if (status === 200) {
    accountToCreate.id = body.id;
  }

  t.end();
};

const canCreateAccountUser = ({ api, user, accountId, userToCreate }) => async (
  t
) => {
  const { status, body } = await api
    .post(`/account/${accountId}/users`)
    .set(user.sessionHeaders)
    .send({
      ...userToCreate.credentials,
      ...userToCreate.otherFields,
    });

  t.equal(status, 200, 'user should be created');
  if (status === 200) {
    userToCreate.id = body.id;
  }

  t.end();
};

const cannotCreateAccountUser = ({
  api,
  user,
  accountId,
  userToCreate,
}) => async (t) => {
  const { status } = await api
    .post(`/account/${accountId}/users`)
    .set(user.sessionHeaders)
    .send({
      ...userToCreate.credentials,
      ...userToCreate.otherFields,
    });

  t.equal(status, 403, 'user should not be created');

  t.end();
};

module.exports = {
  canCreateAccount,
  cannotCreateAccount,
  canCreateSession,
  canCreateAccountUser,
  cannotCreateAccountUser,
};
