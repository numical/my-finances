const JWT_COOKIE_REGEX = /^my-finances-session=.+; Max-Age=600; Path=\/; Expires=.*; HttpOnly; Secure; SameSite=Strict$/;

const assertSession = (t, response) => {
  const { body, headers } = response;
  const { sessionId, timeout } = body;
  t.ok(sessionId, 'returns a session id');
  t.ok(timeout, 'returns a timeout');

  const cookies = headers['set-cookie'];
  t.match(cookies[0], JWT_COOKIE_REGEX, 'returns a cookie' )
  return { sessionId, cookies };
}

module.exports = {
  assertSession
}