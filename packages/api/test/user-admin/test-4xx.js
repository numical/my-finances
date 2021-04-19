module.exports = ({ api, body, expectedStatus = 400, headers, user }) => async (
  t
) => {
  const { status } = await api
    .patch(`/account/personal/user/${user.id}`)
    .set(headers)
    .send(body);

  t.equal(status, expectedStatus, 'request should be rejected');
};
