const Firestore = require('./Firestore');

class UserFirestore extends Firestore {
  constructor(args) {
    super({ ...args, collection: 'users' });
  }
}

module.exports = UserFirestore;
