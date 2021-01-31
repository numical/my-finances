const { test } = require("tap");
const request = require('supertest');

const app = require('../src/app');

test('unknown endpoint returns 404', t => {
  request(app)
    .get('/wibble')
    .expect(404)
    .end( err => {
      t.end();
      if (err) throw err;
    });
});

test('createSession works', t => {
  request(app)
    .post('/session')
    .expect(200)
    .expect('Content-Type', /json/)
    .end( err => {
      t.end();
      if (err) throw err;
    });
});

test('getUser works', t => {
  request(app)
    .get('/user')
    .expect(200)
    .expect('Content-Type', /json/)
    .end( err => {
      t.end();
      if (err) throw err;
    });
});

test('getFinancialModel works', t => {
  request(app)
    .get('/financial-model')
    .expect(200)
    .expect('Content-Type', /json/)
    .end( err => {
      t.end();
      if (err) throw err;
    });
});