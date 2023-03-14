const request = require('supertest');
const app = require('../index');
const mongodb = require('../db/connect');
const port = process.env.PORT || 3000;

// the test suite to run
describe('Student tests', () => {
    let mockStudent = {
        firstName: "Johnny",
        lastName: "Baker",
        email: "johnny.baker@example.edu",
        creditHours: 61
    };
    let newStudentId;
    // what happens before all of the tests run
    beforeAll(async () => {
        // waits for the DB connection to run the tests
        await new Promise((resolve, reject) => {
            mongodb.initDb((err) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve();
              console.log("Connected to DB and listening on ", port);
            }
          });
        });
    });

    describe('POST requests', () => {
        // const newStudent = {
        //     firstName: "Johnny",
        //     lastName: "Baker",
        //     email: "johnny.baker@example.edu",
        //     creditHours: 61
        // };

        it('should create a new student', (done) => {
            request(app)
                .post('/students')
                // this header is important to set
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(mockStudent))
                .end((error, response) => {
                    if (error) {
                    console.log(error);
                    done.fail(error);
                    } else {
                        newStudentId = response.body.student._id;
                    // expect the response:
                        expect(response.statusCode).toBe(201);
                        expect(response.body.student.firstName).toBe(mockStudent.firstName);
                        expect(response.body.student.lastName).toBe(mockStudent.lastName);
                        expect(response.body.student.email).toBe(mockStudent.email);
                        expect(response.body.student.creditHours).toBe(mockStudent.creditHours);
                        done();
                        }
                });
        }, 10000);
    });

    // all GET request tests
    describe('GET requests', () => {
        // the ID to search
        let studentId;
        // if the ID isn't set by POST tests, use this default ID
        if (!newStudentId) {
            studentId = "64079a2f810614d41e5a2188";
        } else {
            studentId = newStudentId;
        }

        // route GET response test
        it('route should respond with status 200', (done) => {
            request(app)
              .get('/students')
              .expect(200)
              .end((err, res) => { 
                if (err) return done.fail(err);
                done();
            });
        });

        // GET 1 student
        it('should get 1 student - Responds with mockStudent', (done) => {
            request(app)
                .get('/students/' + studentId) // request and route
                .expect(200) // expects 200 code
                .expect(mockStudent) // expects the mock student to be returned
                .end((err, res) => { // error handling
                    if (err) return done.fail(err);
                    done();
                });
            }, 10000);

            // GET all students
            // it('get all students - responds with an array of student objects', (done) => {
            // request(app)
            //     .get('/students')
            //     .expect(Array.isArray(response))
            //     .end((err, res) => {
            //     if (err) return done.fail(err);
            //     done();
            //     });
            // }, 10000);
        });

    describe('PUT requests', () => {
        let studentId = "";
        
        if (!newStudentId) {
            console.log("no newStudentId");
            studentId = "64079a2f810614d41e5a2191";
        } else {
            studentId = newStudentId;
        }

        let studentResponse = {
            "_id": studentId,
            "firstName": "Johnny",
            "lastName": "BGood",
            "email": "johnny.bgood@example.edu",
            "creditHours": 61
        };

        const alteredStudent = {
            firstName: "Johnny",
            lastName: "BGood",
            email: "johnny.bgood@example.edu",
            creditHours: 61
        };

        fit('should alter this student: ', (done) => {
            request(app)
                .put("/students/" + studentId)
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(alteredStudent))
                .end((error, response) => {
                    if (error) {
                    console.log(error);
                    done.fail(error);
                    } else {
                    // expect the response:
                    expect(response.statusCode).toBe(204);
                    done();
                    }
                });
        }, 10000);

        fit('should return the altered student', (done) => {
            request(app)
                .get('/students/' + studentId)
                .expect(200)
                .expect(studentResponse)
                .end((err, res) => {
                    if (err) return done.fail(err);
                    done();
                });
            }, 10000);
    });
});

// TO-DO:
// -make the right returns for the tests
// -alter new database entry?
// -delete new entries to the DB after testing POST
// -add DELETE request test
// -cleanup tests
