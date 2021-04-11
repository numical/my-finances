const { DEFAULT } = require('my-finances-common').constants;

module.exports = (user, key = DEFAULT, expectedData = '') => (t) => {
  const { models } = user;
  t.ok(models, 'models collection returned ');
  t.type(models, 'object', 'models is a dictionary');
  t.ok(models[key], 'contains a default model');
  const { data, description, id } = models[key];
  t.equal(
    data,
    expectedData,
    `default model data as expected ${
      expectedData.length === 0 ? '(empty)' : ''
    }`
  );
  t.equal(description, key, `description matches key`);
  t.ok(id, 'default model has an id');
  t.end();
};
