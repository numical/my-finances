const name = 'my-finances-session';

const options = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
};

module.exports = {
  name,
  options,
};
