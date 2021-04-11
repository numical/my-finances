const { test } = require('tap');
const testApi = require('../test-api');
const testForHttpError = require('./test-for-http-error');

const { get404, post400 } = testForHttpError;

testApi((api) => {
  // unknown
  test('unknown endpoint returns 404', get404(api, '/wibble'));

  // incorrect methods
  test('GET /users disallowed', get404(api, '/users'));
  test('GET /sessions disallowed', get404(api, '/sessions'));
  test('GET /models disallowed', get404(api, '/models'));

  // create user - invalid requests
  test(
    'create user without body returns 400',
    post400(api, '/account/personal/users', {})
  );
  test(
    'create user without all necessary fields returns 400',
    post400(api, '/account/personal/users', { authId: undefined })
  );
});
