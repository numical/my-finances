const testApi = require('../test-api');

const authId =
  '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
const email = 'test.email@acme.org';
const pwd = 'fedbca9876543210fedbca9876543210fedbca9876543210fedbca9876543210';

const invalidUserCredentials = {
  'missing email': { authId },
  'missing pwd': { authId, email },
  'invalid auth id': { authId: 'not a 64 character hash', email, pwd },
  'invalid email': { authId, email: 'not a valid email address', pwd },
  'invalid pwd': { authId, email, pwd: 12345 },
};

testApi(async ({ api, test }) => {
  for (const [useCase, credentials] of Object.entries(invalidUserCredentials)) {
    await test(`rejects invalid credentials - ${useCase}`, async (t) => {
      const { status: invalidCredentialsStatus } = await api
        .post('/account/personal/users')
        .send(credentials);
      t.equal(invalidCredentialsStatus, 400, 'returns 400 error');
      t.end();
    });
  }
});
