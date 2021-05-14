/*
 The name is mandated by Firebase.
 https://firebase.google.com/docs/hosting/manage-cache#using_cookies
 */
const COOKIE_NAME = '__session';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'Strict',
};

module.exports = {
  COOKIE_NAME,
  COOKIE_OPTIONS,
};
