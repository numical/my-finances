const entityImpls = require('./entity-implementations');

module.exports = ({ config, enforceSchemaFn }) => {
  const dataStores = {};
  Object.entries(entityImpls).forEach(([entity, impls]) => {
    dataStores[entity] = new impls[config.dataSource]({
      config,
      enforceSchemaFn,
    });
  });
  return dataStores;
};
