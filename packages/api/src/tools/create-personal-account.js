const { deepStrictEqual } = require('assert');
const { Firestore } = require('@google-cloud/firestore');
const { constants } = require('my-finances-common');
const { version } = require('../../package.json');

const { PERSONAL_ACCOUNTS } = constants;

const report = console.log;

const createPersonalAccount = async () => {
  report(`creating account '${PERSONAL_ACCOUNTS}'...`);

  const db = new Firestore();

  const preExisting = await db.doc(`/accounts/${PERSONAL_ACCOUNTS}`).get();
  if (preExisting.exists) {
    report(`Account '${PERSONAL_ACCOUNTS}' already exists`);
    return;
  }

  const collectionRef = db.collection('accounts');
  const toCreate = {
    id: PERSONAL_ACCOUNTS,
    lastUpdated: Date.now(),
    version,
  };
  await collectionRef.doc(PERSONAL_ACCOUNTS).set(toCreate);

  const snapshot = await db.doc(`/accounts/${PERSONAL_ACCOUNTS}`).get();
  if (snapshot.exists) {
    const created = snapshot.data();
    deepStrictEqual(created, toCreate);
  }

  report(`...account '${PERSONAL_ACCOUNTS}' created and confirmed.`);
};

module.exports = createPersonalAccount;
