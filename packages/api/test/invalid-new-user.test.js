const { test } = require('tap');
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

testApi(async (api) => {
  for (const [useCase, credentials] of Object.entries(invalidUserCredentials)) {
    test(`rejects invalid credentials - ${useCase}`, async (t) => {
      const { status: invalidCredentialsStatus } = await api
        .post('/users')
        .send(credentials);
      t.equal(invalidCredentialsStatus, 400, 'returns 400 error');
      t.end();
    });
  }
});
