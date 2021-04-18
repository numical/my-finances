const { random } = require('../../src/util');

module.exports = ({ api, body, headers, user }) => async (t) => {
  const { status } = await api
    .patch(`/account/personal/user/${user.id}`)
    .set(headers)
    .send(body);

  t.equal(status, 400, 'request should be rejected');
};
