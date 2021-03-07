const { FieldPath } = require('@google-cloud/firestore');
const Firestore = require('./Firestore');
const { USER_DOC } = require('./schemas');

const transformToDoc = (user) => ({
  id: user.id,
  userId: user.userId,
  pwd: user.pwd,
  account: {
    email: user.email,
  },
  keyStores: user.keyStores,
});

const transformFromDoc = (document) => ({
  id: document.id,
  userId: document.userId,
  pwd: document.pwd,
  email: document.account.email,
  keyStores: document.keyStores,
});

const transformSearchField = ([field, value]) => {
  if (field === 'email') {
    return [new FieldPath('account', 'email'), value];
  } else {
    return [field, value];
  }
};

class Users extends Firestore {
  constructor(args) {
    super({
      ...args,
      collection: 'users',
      schema: USER_DOC,
      transformFromDoc,
      transformToDoc,
      transformSearchField,
    });
  }
}

module.exports = Users;
