const request = require('supertest');
const app = require('../index');
const mongodb = require('../db/connect');
const port = process.env.PORT || 3000;
const facultyController = require('../controllers/faculty');

describe('Faculty tests', () => {
    const mockFaculty = {
        firstName: "Johnny",
        lastName: "Baker",
        email: "johnny.baker@example.edu",
        bio: "Nulla commodo"
    };
    const defaultId = '640ae891c1f2d58533956f2a';
    let newFacultyId;
    let facultyId;

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

    // GET /faculty response
    // *working*
    it('route should respond with status 200', (done) => {
        request(app)
            .get('/faculty')
            .expect(200)
            .end((err, res) => { 
            if (err) return done.fail(err);
            done();
        });
    });

    // GET all faculty
    // *working*
    it('should get all faculty', async () => {
        const response = await request(app).get('/faculty');

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
    }, 10000);

    // GET 1 faculty
    // *working*
    it('should get 1 faculty', async () => {
        facultyId = defaultId;
        const mockGetReq = {
            params: {
              id: facultyId
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

        await facultyController.getSingle(mockGetReq, mockGetRes);

        expect(mockGetRes.statusCode).toBe(200);
        expect(mockGetRes.data.firstName).toBe('Jared');
        expect(mockGetRes.data.lastName).toBe('Guzman');
        expect(mockGetRes.data.email).toBe('jguzman@fakeemail.com');
        expect(mockGetRes.data.bio).toBe('Nulla commodo nulla quisque ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique tortor eu');
    }, 10000);

    describe('CREATE tests', () => {
        // POST new faculty
        // *working*
        it('should create a new faculty', async () => {
            const mockReq = {
            body: {
                firstName: mockFaculty.firstName,
                lastName: mockFaculty.lastName,
                email: mockFaculty.email,
                bio: mockFaculty.bio
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
        
            await facultyController.createFaculty(mockReq, mockRes);
            newFacultyId = mockRes.data.faculty._id;
        
            expect(mockRes.data.message).toBe("Created new faculty successfully.");
            expect(mockRes.statusCode).toBe(201);
            expect(mockRes.data.faculty.firstName).toBe('Johnny');
            expect(mockRes.data.faculty.lastName).toBe('Baker');
            expect(mockRes.data.faculty.email).toBe('johnny.baker@example.edu');
            expect(mockRes.data.faculty.bio).toBe('Nulla commodo');
        }, 10000);

        // *working*
        it('mongoose validation error', async () => {
            // empty body
            const mockReq = {
                body: {}
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
        
            await facultyController.createFaculty(mockReq, mockRes);
        
            expect(mockRes.data.message).toBe("Faculty validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required., bio: Path `bio` is required., email: Path `email` is required.");
            expect(mockRes.statusCode).toBe(400);
        }, 10000);

    });

    // PUT update new faculty
    // *working*
    it('should update the new faculty', async () => {
        if (newFacultyId) {
            facultyId = newFacultyId;
        } else {
            console.log("PUT faculty - newFacultyId error");
            return;
        }
        const altFaculty = {
            firstName: "John",
            lastName: "BGood",
            email: "johnny.bgood@example.edu",
            bio: "Nulla commodo"
        };
        const mockPutReq = {
            params: {
                id: facultyId
            },
            body: {
                firstName: altFaculty.firstName,
                lastName: altFaculty.lastName,
                email: altFaculty.email,
                bio: altFaculty.bio,
            }
        };
        const mockPutRes = {
            status: (statusCode) => ({
                json: (data) => {
                    mockPutRes.statusCode = statusCode;
                    mockPutRes.data = data;
                    return mockPutRes;
                },
              })
        };
    
        await facultyController.updateFaculty(mockPutReq, mockPutRes);
    
        expect(mockPutRes.data.message).toBe("Updated faculty successfully.");
        expect(mockPutRes.statusCode).toBe(204);
        expect(mockPutRes.data.firstName).toBe('John');
        expect(mockPutRes.data.lastName).toBe('BGood');
        expect(mockPutRes.data.email).toBe('johnny.bgood@example.edu');
        expect(mockPutRes.data.bio).toBe('Nulla commodo');
    }, 10000);

    // DELETE 1 faculty
    // *working*
    it('should delete 1 faculty', async () => {
        if (newFacultyId) {
            facultyId = newFacultyId;
        } else {
            console.log("Deletion error. newFacultyId failed.");
            return;
        }
        const mockDeleteReq = {
            params: {
              id: facultyId
            }
          };
        const mockDeleteRes = {
            status: (statusCode) => ({
                json: (data) => {
                    mockDeleteRes.statusCode = statusCode;
                    mockDeleteRes.data = data;
                    return mockDeleteRes;
                },
            })
        };

        await facultyController.deleteFaculty(mockDeleteReq, mockDeleteRes);

        expect(mockDeleteRes.statusCode).toBe(200);
        expect(mockDeleteRes.data.message).toBe("Deleted faculty successfully.");
    }, 10000);
});