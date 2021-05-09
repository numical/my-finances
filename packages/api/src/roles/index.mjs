const roles = {
  ACCOUNT_ADMIN: 'admin',
  PERSONAL: 'personal',
  SUPERUSER: 'superuser',
};
roles.allow = {
  [roles.ACCOUNT_ADMIN]: ({ accountId: sessionId }, { accountId: requestId }) =>
    sessionId === requestId,
  [roles.PERSONAL]: ({ userId: sessionId }, { userId: requestId }) =>
    sessionId === requestId,
  [roles.SUPERUSER]: () => true,
};
export default roles;
