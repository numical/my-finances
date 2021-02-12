export const Auth = {
  CHALLENGE: 'challenge',
  AUTHENTICATING: 'authenticating',
  AUTHENTICATED: 'authenticated',
};

Auth.initial = {
  email: '',
  userId: '',
  pwd: '',
  pwdHash: '',
  sessionId: '',
  state: Auth.CHALLENGE,
  timeout: 0,
};
