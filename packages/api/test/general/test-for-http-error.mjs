import supertest from 'supertest';

const request = (app) => (typeof app === 'function' ? supertest(app) : app);
const testForGetError = (errorCode) => (app, path) => (t) => {
  request(app)
    .get(path)
    .expect(errorCode)
    .end((error) => {
      if (error) throw error;
      t.end();
    });
};
const testForPostError = (errorCode) => (app, path, body) => (t) => {
  request(app)
    .post(path)
    .set('Content-Type', 'application/json')
    .send(body)
    .expect(errorCode)
    .end((error) => {
      if (error) throw error;
      t.end();
    });
};
export const get400 = testForGetError(400);
export const get404 = testForGetError(404);
export const post400 = testForPostError(400);
export const post404 = testForPostError(404);
