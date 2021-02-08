export const Auth = {
  CHALLENGE: 'challenge',
  AUTHENTICATING: 'authenticating',
  AUTHENTICATED: 'authenticated',
};

export const authInitial = {
  email: '',
  userId: '',
  pwd: '',
  pwdHash: '',
  sessionId: '',
  state: Auth.CHALLENGE,
  timeout: 0,
};

export const modelsInitial = {};

export const userInitial = {};
