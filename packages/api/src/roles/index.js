const roles = {
  ACCOUNT_ADMIN: 'admin',
  PERSONAL: 'personal',
  SUPERUSER: 'superuser',
};

roles.ANY = Object.keys(roles);

module.exports = roles;
