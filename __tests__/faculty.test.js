const request = require('supertest');
const app = require('../index');

// describe('GET /', () => {
//   it('responds with welcome message', async () => {
//     const response = await request(app).get('/');
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual("welcome :)");
//   });
// });

describe('GET /students/64079a2f810614d41e5a2188', () => {
  it('responds with avery student', async () => {
    jest.setTimeout(30000);
    const response = await request(app).get('/students/64079a2f810614d41e5a2188');
    const student = {
      "_id": "64079a2f810614d41e5a2188",
      "firstName": "Avery",
      "lastName": "Baker",
      "email": "avery.baker@example.edu",
      "creditHours": 61
    };
    expect(response.status).toBe(200);
    expect(response.body).toEqual(student);
  });
});