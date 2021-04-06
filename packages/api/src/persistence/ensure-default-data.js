const { PERSONAL_ACCOUNTS } = require('my-finances-common');
const { version } = require('../../package.json');

module.exports = async (dataStores) => {
  const { accounts } = dataStores;
  const personalAccounts = await accounts.get(PERSONAL_ACCOUNTS);
  if (!personalAccounts) {
    const entity = {
      id: PERSONAL_ACCOUNTS,
      lastUpdated: Date.now(),
      version,
    };
    await accounts.create({ entity });
  }
};
