const request = require('supertest');
const app = require('../index');

describe('GET /', () => {
  it('responds with status 200', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done.fail(err);
        done();
      });
  });

  it('responds with "welcome :)"', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('welcome :)')
      .end((err, res) => {
        if (err) return done.fail(err);
        done();
      });
  });
});
