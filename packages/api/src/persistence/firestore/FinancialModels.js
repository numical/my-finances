const Firestore = require('./Firestore');
const { FINANCIAL_MODEL_DOC } = require('./schemas');

class FinancialModels extends Firestore {
  constructor() {
    super({
      ...args,
      collection: 'financialModels',
      schema: FINANCIAL_MODEL_DOC,
    });
  }
}

module.exports = FinancialModels;
