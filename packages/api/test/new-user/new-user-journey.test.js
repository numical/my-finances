const { DEFAULT, SESSION_TOKEN } = require('my-finances-common').constants;
const { random, string } = require('../../src/util');
const testApi = require('../test-api');
const testUserModel = require('./test-user-model');

const { reverse } = string;

const JWT_COOKIE_REGEX = /^__session=.+; Max-Age=600; Path=\/; Expires=.*; HttpOnly; Secure; SameSite=Strict$/;

const generateUserCredentials = (hash) => ({
  authId: hash,
  email: `${hash.substring(0, 12)}@acme.org`,
  pwd: reverse(hash),
});

testApi(async ({ api, testHash, test }) => {
  const userCredentials = generateUserCredentials(testHash);
  const modelContent = random.string(128);
  const journey = {};

  await test('creates user when valid credentials passed', async (t) => {
    const { status, body, text } = await api
      .post('/account/personal/users')
      .send(userCredentials);
    const { authId, email, pwd } = body;

    t.ok(text, `response received: '${text}'`);
    t.equal(status, 200, 'creates user');
    t.same({ authId, email, pwd }, userCredentials, 'returns user credentials');

    journey.user = body;
    t.end();
  });

  await test('instantiates model', testUserModel(journey.user));

  await test('cannot fetch user until session created', async (t) => {
    const { status } = await api.get(
      `/account/personal/user/${journey.user.id}`
    );

    t.equal(status, 401, 'should be a 401');

    t.end();
  });

  await test('cannot create session with invalid credentials', async (t) => {
    const { status } = await api
      .post('/sessions')
      .send({ ...userCredentials, pwd: 'INVALID' });

    t.equal(status, 401, 'request should be rejected');

    t.end();
  });

  await test('creates session', async (t) => {
    const { status, body, headers } = await api
      .post('/sessions')
      .send(userCredentials);
    const { sessionId, timeout } = body;
    const cookies = headers['set-cookie'];

    t.equal(status, 200, 'should be a 200');
    if (status === 200) {
      t.ok(sessionId, 'returns a session id');
      t.ok(timeout, 'returns a timeout');
      t.match(cookies[0], JWT_COOKIE_REGEX, 'returns a cookie');

      journey.headers = {
        [SESSION_TOKEN]: sessionId,
        Cookie: cookies,
      };
    }
    t.end();
  });

  await test('can fetch user when certs data sent', async (t) => {
    const { status, body } = await api
      .get(`/account/personal/user/${journey.user.id}`)
      .set(journey.headers);

    t.equal(status, 200, 'should be a 200');
    if (status === 200) {
      t.same(body, journey.user, 'fetched user matches created user');
      testUserModel(body);

      journey.model = body.models[DEFAULT];
    }
    t.end();
  });

  await test('can fetch newly created model directly', async (t) => {
    const { status, body } = await api
      .get(
        `/account/personal/user/${journey.user.id}/models/${journey.model.id}`
      )
      .set(journey.headers);

    t.equal(status, 200, 'should be a 200');
    t.same(body, journey.model, 'directly fetched model matches user model');

    t.end();
  });

  await test('can update a model', async (t) => {
    journey.model.data = modelContent;
    const { status } = await api
      .put(
        `/account/personal/user/${journey.user.id}/models/${journey.model.id}`
      )
      .send(journey.model)
      .set(journey.headers);

    t.equal(status, 200, 'should be a 200');

    t.end();
  });

  await test('fetched user has updated model', async (t) => {
    const { status, body } = await api
      .get(`/account/personal/user/${journey.user.id}`)
      .set(journey.headers);

    t.equal(status, 200, 'should be a 200');

    journey.user = body;
    journey.model = body.models[DEFAULT];
    t.end();
  });

  await test(
    'fetched user has updated model',
    testUserModel(journey.user, DEFAULT, modelContent)
  );
});
