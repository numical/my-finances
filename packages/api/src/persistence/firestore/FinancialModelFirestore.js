const Firestore = require('./Firestore');

class FinancialModelFirestore extends Firestore {
  constructor() {
    super({ ...args, collection: 'financialModels' });
  }
}

module.exports = FinancialModelFirestore;
