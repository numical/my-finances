const entityImpls = require('../datastores');

module.exports = ({ config, schemaValidator }) => {
  const datastores = {};
  Object.entries(entityImpls).forEach(([entity, impls]) => {
    datastores[entity] = new impls[config.dataSource]( { schemaValidator });
  })
  return (req, res, next) => {
    req.datastores = datastores;
    next();
  };
};
