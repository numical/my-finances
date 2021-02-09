const maxAge = 10 * 60 * 1000;

const name = 'my-finances-session';

const options = {
  maxAge,
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
};

module.exports = {
  maxAge,
  name,
  options
};