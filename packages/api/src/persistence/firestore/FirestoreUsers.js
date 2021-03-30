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
  models: user.models,
});

const transformFromDoc = (document) => ({
  id: document.id,
  userId: document.userId,
  pwd: document.pwd,
  email: document.account.email,
  models: document.models,
});

const transformSearchField = ([field, value]) => {
  if (field === 'email') {
    return [new FieldPath('account', 'email'), value];
  } else {
    return [field, value];
  }
};

class FirestoreUsers extends Firestore {
  constructor(args) {
    super({
      ...args,
      collections: ['users'],
      toSchema: USER_DOC,
      fromSchema: USER,
      transformFromDoc,
      transformToDoc,
      transformSearchField,
    });
  }
}

module.exports = FirestoreUsers;
