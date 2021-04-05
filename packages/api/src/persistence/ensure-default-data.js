const { PERSONAL_ACCOUNTS } = require('my-finances-common');

module.exports = async (dataStores) => {
  const { accounts } = dataStores;
  const personalAccounts = await accounts.get(PERSONAL_ACCOUNTS);
  if (!personalAccounts) {
    const entity = { id: PERSONAL_ACCOUNTS };
    await accounts.create({ entity });
  }
};
