const request = require('supertest');
const app = require('../index');
const mongodb = require('../db/connect');
const port = process.env.PORT || 3000;
const studentController = require('../controllers/student');

describe('Student tests', () => {
    const mockStudent = {
        firstName: "Johnny",
        lastName: "Baker",
        email: "johnny.baker@example.edu",
        creditHours: 61
    };
    let newStudentId;
    let studentId;
    const defaultId = '641f6fe3d52ef47907d64063';
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

    // *working*
    it('should get all students', async () => {
        const response = await request(app).get('/students');
  
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
    }, 10000);

    // *working*
    it('should create a new student', async () => {
        const mockReq = {
          body: {
            firstName: mockStudent.firstName,
            lastName: mockStudent.lastName,
            email: mockStudent.email,
            creditHours: mockStudent.creditHours,
          }
        };
        const mockRes = {
            status: (statusCode) => ({
                json: (data) => {
                    mockRes.statusCode = statusCode;
                    mockRes.data = data;
                    return mockRes;
                },
              })
        };
    
        await studentController.createStudent(mockReq, mockRes);
        newStudentId = mockRes.data.student._id;
    
        expect(mockRes.data.message).toBe("Created new Student successfully.");
        expect(mockRes.statusCode).toBe(201);
        expect(mockRes.data.student.firstName).toBe('Johnny');
        expect(mockRes.data.student.lastName).toBe('Baker');
        expect(mockRes.data.student.email).toBe('johnny.baker@example.edu');
        expect(mockRes.data.student.creditHours).toBe(61);
    }, 10000);

    // route GET response test
    // *working*
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
    // *working*
    it('should get 1 student - Responds with mockStudent', async () => {
        // if the ID isn't set by POST tests, use this default ID
        if (!newStudentId) {
            studentId = defaultId;
        } else {
            studentId = newStudentId;
        }

        const mockGetReq = {
            params: {
              id: studentId
            }
          };

        const mockGetRes = {
            status: (statusCode) => ({
                json: (data) => {
                    mockGetRes.statusCode = statusCode;
                    mockGetRes.data = data;
                    return mockGetRes;
                },
            }),
            setHeader: ()=>{}
        };

        await studentController.getSingle(mockGetReq, mockGetRes);

        expect(mockGetRes.statusCode).toBe(200);

        if (newStudentId) {
            expect(mockGetRes.data.firstName).toBe(mockStudent.firstName);
            expect(mockGetRes.data.lastName).toBe(mockStudent.lastName);
            expect(mockGetRes.data.email).toBe(mockStudent.email);
            expect(mockGetRes.data.creditHours).toBe(mockStudent.creditHours);
        } else {
            expect(mockGetRes.data.firstName).toBe('Madison');
            expect(mockGetRes.data.lastName).toBe('Hall');
            expect(mockGetRes.data.email).toBe('madison.hall@example.edu');
            expect(mockGetRes.data.creditHours).toBe(132);
        }
    }, 10000);

    // let studentResponse = {
    //     "_id": studentId,
    //     "firstName": "Johnny",
    //     "lastName": "BGood",
    //     "email": "johnny.bgood@example.edu",
    //     "creditHours": 61
    // };

    const alteredStudent = {
        firstName: "Johnny",
        lastName: "BGood",
        email: "johnny.bgood@example.edu",
        creditHours: 61
    };

    it('should alter this student: ', (done) => {
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

    // DELETE 1 student
    // *not working*
    it('should delete 1 student - Responds with ____', async () => {
        // if the ID isn't set by POST tests, use this default ID
        if (!newStudentId) {
            studentId = defaultId;
        } else {
            studentId = newStudentId;
        }

        const mockDeleteReq = {
            params: {
              id: studentId
            }
          };

        const mockDeleteRes = {
            status: (statusCode) => ({
                json: (data) => {
                    mockDeleteRes.statusCode = statusCode;
                    mockDeleteRes.data = data;
                    return mockDeleteRes;
                },
            }),
            setHeader: ()=>{}
        };

        await studentController.deleteStudent(mockDeleteReq, mockDeleteRes);

        expect(mockGetRes.statusCode).toBe(200);

        if (newStudentId) {
            expect(mockGetRes.data.firstName).toBe(mockStudent.firstName);
            expect(mockGetRes.data.lastName).toBe(mockStudent.lastName);
            expect(mockGetRes.data.email).toBe(mockStudent.email);
            expect(mockGetRes.data.creditHours).toBe(mockStudent.creditHours);
        } else {
            expect(mockGetRes.data.firstName).toBe('Madison');
            expect(mockGetRes.data.lastName).toBe('Hall');
            expect(mockGetRes.data.email).toBe('madison.hall@example.edu');
            expect(mockGetRes.data.creditHours).toBe(132);
        }
    }, 10000);

});

// TO-DO:
// -alter new database entry?
// -delete new entries to the DB after testing POST
// -add DELETE request test
// -cleanup tests
// -add error handling tests