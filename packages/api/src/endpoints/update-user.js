const { PERSONAL } = require('../roles');
const {
  createSchema,
  DICTIONARY,
  EMAIL,
  HASH,
  ROLES,
  STRING,
  USER,
} = require('../schemas');

const requestSchema = createSchema({
  id: 'update_user_request',
  properties: {
    authId: HASH,
    email: EMAIL,
    pwd: STRING,
    roles: ROLES,
    models: DICTIONARY,
  },
});

const responseSchema = USER;

const handler = async (req, res, next) => {
  // dependent on fields, different
  // dependent on session user - set status
  // dependent on session user what can be updated
};

module.exports = {
  verb: 'patch',
  path: '/account/personal/users',
  requiresAuth: true,
  handler,
  requestSchema,
  responseSchema,
};
