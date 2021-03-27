const { FieldPath } = require('@google-cloud/firestore');
const Firestore = require('./Firestore');
const { USER, USER_DOC } = require('./schemas');

const transformToDoc = (user) => ({
  id: user.id,
  userId: user.userId,
  pwd: user.pwd,
  account: {
    email: user.email,
  },
  financialModels: user.financialModels,
});

const transformFromDoc = (document) => ({
  id: document.id,
  userId: document.userId,
  pwd: document.pwd,
  email: document.account.email,
  financialModels: document.financialModels,
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
      toSchema: USER_DOC,
      fromSchema: USER,
      transformFromDoc,
      transformToDoc,
      transformSearchField,
    });
  }
}

module.exports = Users;
