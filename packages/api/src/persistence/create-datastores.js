const entityImpls = require('./entity-implementations');

module.exports = ({ config, enforceSchema }) => {
  const dataStores = {};
  Object.entries(entityImpls).forEach(([entity, impls]) => {
    dataStores[entity] = new impls[config.dataSource]({
      config,
      enforceSchema,
    });
  });
  return dataStores;
};
