/*
 The name is mandated by Firebase.
 https://firebase.google.com/docs/hosting/manage-cache#using_cookies
 */
const name = '__session';

const options = {
  httpOnly: true,
  secure: true,
  sameSite: 'Strict',
};

module.exports = {
  name,
  options,
};
