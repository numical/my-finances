const Firestore = require('./Firestore');

class FinancialModelFirestore extends Firestore {
  constructor() {
    super('users');
  }
}

module.exports = FinancialModelFirestore;
