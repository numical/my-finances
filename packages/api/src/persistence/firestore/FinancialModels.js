const Firestore = require('./Firestore');
const { FINANCIAL_MODEL, FINANCIAL_MODEL_DOC } = require('./schemas');

class FinancialModels extends Firestore {
  constructor(args) {
    super({
      ...args,
      collection: 'financialModels',
      fromSchema: FINANCIAL_MODEL,
      toSchema: FINANCIAL_MODEL_DOC,
    });
  }
}

module.exports = FinancialModels;
