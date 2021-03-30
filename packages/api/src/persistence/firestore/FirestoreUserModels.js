const Firestore = require('./Firestore');
const { MODEL, MODEL_DOC } = require('./schemas');

class FirestoreUserModels extends Firestore {
  constructor(args) {
    super({
      ...args,
      collections: ['users', 'models'],
      toSchema: MODEL_DOC,
      fromSchema: MODEL,
    });
  }
}

module.exports = FirestoreUserModels;
