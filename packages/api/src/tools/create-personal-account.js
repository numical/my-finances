const { deepStrictEqual } = require('assert');
const { Firestore } = require('@google-cloud/firestore');
const { constants } = require('my-finances-common');
const { addCreatedFields } = require('../endpoints/util');

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
  const toCreate = addCreatedFields({
    id: PERSONAL_ACCOUNTS,
    description: PERSONAL_ACCOUNTS,
  });
  await collectionRef.doc(PERSONAL_ACCOUNTS).set(toCreate);

  const snapshot = await db.doc(`/accounts/${PERSONAL_ACCOUNTS}`).get();
  if (snapshot.exists) {
    const created = snapshot.data();
    deepStrictEqual(created, toCreate);
    report(`...account '${PERSONAL_ACCOUNTS}' created and confirmed.`);
    return created;
  } else {
    throw new Error(
      `account '${PERSONAL_ACCOUNTS}' was not found after creation.`
    );
  }
};

module.exports = createPersonalAccount;
