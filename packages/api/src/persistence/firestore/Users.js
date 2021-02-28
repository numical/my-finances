const Firestore = require('./Firestore');
const { USER_DOC } = require('./schemas');

class Users extends Firestore {
  constructor(args) {
    super({ ...args, collection: 'users', schema: USER_DOC });
  }
}

module.exports = Users;
