/*
 The name is mandated by Firebase.
 https://firebase.google.com/docs/hosting/manage-cache#using_cookies
 */
export const COOKIE_NAME = '__session';

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'Strict',
};
