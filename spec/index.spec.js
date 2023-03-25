const request = require('supertest');
const app = require('../index');

describe('Index Tests', () => {
  it('responds with status 200', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done.fail(err);
        done();
      });
  });

  it('responds with "Logged out"', (done) => {
    request(app)
      .get('/')
      .expect('Logged out')
      .end((err, res) => {
        if (err) return done.fail(err);
        done();
      });
  });
});
