export const roles = {
  ACCOUNT_ADMIN: 'admin',
  PERSONAL: 'personal',
  SUPERUSER: 'superuser',
};

export const allow = {
  [roles.ACCOUNT_ADMIN]: ({ accountId: sessionId }, { accountId: requestId }) =>
    sessionId === requestId,
  [roles.PERSONAL]: ({ userId: sessionId }, { userId: requestId }) =>
    sessionId === requestId,
  [roles.SUPERUSER]: () => true,
};

