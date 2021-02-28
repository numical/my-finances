const Firestore = require('./Firestore');
const { KEYSTORE_DOC } = require('./schemas');

class KeyStores extends Firestore {
  constructor() {
    super({ ...args, collection: 'keyStores', schema: KEYSTORE_DOC });
  }
}

module.exports = KeyStores;
