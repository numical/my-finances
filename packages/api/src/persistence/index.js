const createDatastores = require('./create-datastores');
const ensureDefaultData = require('./ensure-default-data');

const init = async ({ config, enforceSchemaFn }) => {
  const dataStores = createDatastores({ config, enforceSchemaFn });
  await ensureDefaultData(dataStores);
  return dataStores;
};

module.exports = {
  init,
};
