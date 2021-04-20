module.exports = ({
  api,
  body,
  expectedStatus = 400,
  sessionHeaders,
  user,
}) => async (t) => {
  const { status } = await api
    .patch(`/account/personal/user/${user.id}`)
    .set(sessionHeaders)
    .send(body);

  t.equal(status, expectedStatus, 'request should be rejected');
};
