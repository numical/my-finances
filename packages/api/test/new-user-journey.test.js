const { DEFAULT, SESSION_TOKEN } = require('my-finances-common');
const testApi = require('./util/test-api');

const JWT_COOKIE_REGEX = /^__session=.+; Max-Age=600; Path=\/; Expires=.*; HttpOnly; Secure; SameSite=Strict$/;

const userId =
  '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
const email = 'test.email@acme.org';
const pwd = 'fedbca9876543210fedbca9876543210fedbca9876543210fedbca9876543210';
const userCredentials = { userId, email, pwd };

testApi(async (api, test) => {
  const { status: createUserStatus, body: user, text } = await api
    .post('/users')
    .send(userCredentials);

  await test('creates user when valid credentials passed', (t) => {
    t.ok(text, `response received: '${text}'`);
    t.equal(createUserStatus, 200, 'creates user');
    t.end();
  });

  const { userId, email, pwd } = user;

  await test('returns user credentials', (t) => {
    t.same({ userId, email, pwd }, userCredentials);
    t.end();
  });

  const { financialModels } = user;

  await test('instantiates financial model', (t) => {
    t.ok(financialModels, 'financial models collection returned ');
    t.type(financialModels, 'object', 'financial models is a dictionary');
    t.ok(financialModels[DEFAULT], 'creates a default model');
    t.equal(
      Object.keys(financialModels[DEFAULT]).length,
      0,
      'default model is empty'
    );
    t.end();
  });

  const { status: failFetchStatus } = await api.get(`/user/${userId}`);

  await test('cannot fetch user until session created', (t) => {
    t.equal(failFetchStatus, 401, 'should be a 401');
    t.end();
  });

  const sessionResponse = await api.post('/sessions').send({ userId, pwd });

  await test('creates session', (t) => {
    t.equal(sessionResponse.status, 200, 'should be a 200');
    t.end();
  });

  const { body } = sessionResponse;
  const { sessionId, timeout } = body;

  await test('session holds necessary fields', (t) => {
    t.ok(sessionId, 'returns a session id');
    t.ok(timeout, 'returns a timeout');
    t.end();
  });

  const { headers } = sessionResponse;
  const cookies = headers['set-cookie'];

  await test('session cookie returned', (t) => {
    t.match(cookies[0], JWT_COOKIE_REGEX, 'returns a cookie');
    t.end();
  });

  const { status: fetchStatus, body: fetchedUser } = await api
    .get(`/user/${userId}`)
    .set(SESSION_TOKEN, sessionId)
    .set('Cookie', cookies);

  await test('can fetch user when certs data sent', (t) => {
    t.equal(fetchStatus, 200);
    t.same(fetchedUser, user, 'fetched user matches created user');
    t.end();
  });
});
