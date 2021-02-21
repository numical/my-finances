const Firestore = require('./Firestore');

class UserFirestore extends Firestore {
  constructor() {
    super('users');
  }
}

module.exports = UserFirestore;
