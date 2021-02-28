const Firestore = require('./Firestore');

class Users extends Firestore {
  constructor(args) {
    super({ ...args, collection: 'users' });
  }

  async create(user) {
    const { userId, email, pwd } = user;
  }
}

module.exports = Users;
