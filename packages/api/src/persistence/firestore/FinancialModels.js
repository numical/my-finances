const Firestore = require('./Firestore');

class FinancialModels extends Firestore {
  constructor() {
    super({ ...args, collection: 'financialModels' });
  }
}

module.exports = FinancialModels;
