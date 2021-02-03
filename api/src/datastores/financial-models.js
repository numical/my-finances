// Cloud Run instances hang around for 10 mins

const models = {};

module.exports = {
  get: (id) => models[id],
  set: (id, model) => (models[id] = model),
};
