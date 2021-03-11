const { test, only } = require('tap');
const { SESSION_TOKEN } = require('my-finances-common');
const assertSession = require('./util/assert-session');
const testApi = require('./util/test-api');

const userId =
  '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
const email = 'test.email@acme.org';
const pwd = 'fedbca9876543210fedbca9876543210fedbca9876543210fedbca9876543210';

const invalidUserCredentials = {
  'missing email': { userId },
  'missing pwd': { userId, email },
  'invalid user id': { userId: 'not a 64 character hash', email, pwd },
  'invalid email': { userId, email: 'not a valid email address', pwd },
  'invalid pwd': { userId, email, pwd: 12345 },
};

const validUserCredentials = { userId, email, pwd };

testApi((api) => {
  test('create new user', async (t) => {
    for (const [useCase, credentials] of Object.entries(
      invalidUserCredentials
    )) {
      const { status: invalidCredentialsStatus } = await api
        .post('/users')
        .send(credentials);
      t.equal(
        invalidCredentialsStatus,
        400,
        `rejects invalid credentials - ${useCase}`
      );
    }

    const { status: createUserStatus, body: user } = await api
      .post('/users')
      .send(validUserCredentials);
    t.equal(createUserStatus, 200, 'creates user');

    const { userId, email, pwd, financialModels } = user;
    t.same(
      { userId, email, pwd },
      validUserCredentials,
      'returns user credentials'
    );
    t.ok(financialModels, 'instantiates financial models collection');

    const { status: failFetchStatus } = await api.get(`/user/${userId}`);
    t.equal(failFetchStatus, 401, 'cannot fetch user until session created');

    const sessionResponse = await api.post('/sessions').send({ userId, pwd });
    t.equal(sessionResponse.status, 200, 'creates session');
    const { sessionId, cookies } = assertSession(t, sessionResponse);

    const { status: fetchStatus, body: fetchedUser } = await api
      .get(`/user/${userId}`)
      .set(SESSION_TOKEN, sessionId)
      .set('Cookie', cookies);
    t.equal(fetchStatus, 200, 'can fetch user when certs data sent');

    t.same(fetchedUser, user);

    t.end();
  });
});
