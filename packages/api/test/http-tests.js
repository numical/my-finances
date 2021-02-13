const supertest = require('supertest');

const request = (app) => (typeof app === 'function' ? supertest(app) : app);

const testForGetError = (errorCode) => (app, path) => (t) => {
  request(app)
    .get(path)
    .expect(errorCode)
    .end((err) => {
      if (err) throw err;
      t.end();
    });
};

const testForPostError = (errorCode) => (app, path, body) => (t) => {
  request(app)
    .post(path)
    .set('Content-Type', 'application/json')
    .send(body)
    .expect(errorCode)
    .end((err) => {
      if (err) throw err;
      t.end();
    });
};

module.exports = {
  get400: testForGetError(400),
  get404: testForGetError(404),
  post400: testForPostError(400),
  post404: testForPostError(404),
};
