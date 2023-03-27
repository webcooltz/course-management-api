const request = require('supertest');
const app = require('../index');
const mongodb = require('../db/connect');
const port = process.env.PORT || 3000;
const courseController = require('../controllers/course');

fdescribe('Course tests', () => {
    const mockCourse = {
        name: "Introduction to Intro",
        subject: "Intro",
        code: "INTRO 101",
        section: "001",
        description: "An introduction to intros.",
        faculty: "Jared Guzman",
        creditHours: 1,
        books: "Intro"
    };
    const defaultId = '640cc787c7f435cd086835a7';
    let newCourseId;
    let courseId;

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

    // GET /courses response
    // *working*
    it('route should respond with status 200', (done) => {
        request(app)
            .get('/courses')
            .expect(200)
            .end((err, res) => { 
            if (err) return done.fail(err);
            done();
        });
    });

    // GET all courses
    // *working*
    it('should get all courses', async () => {
        const response = await request(app).get('/courses');

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
    }, 10000);

    // GET 1 course
    // *working*
    it('should get 1 course', async () => {
        courseId = defaultId;
        const mockGetReq = {
            params: {
              id: courseId
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

        await courseController.getSingle(mockGetReq, mockGetRes);

        expect(mockGetRes.statusCode).toBe(200);
        expect(mockGetRes.data.name).toBe('Introduction to Literary Analysis');
        expect(mockGetRes.data.subject).toBe('English');
        expect(mockGetRes.data.code).toBe('ENGL 101');
        expect(mockGetRes.data.section).toBe('001');
        expect(mockGetRes.data.description).toBe('An introduction to the basic tools of literary analysis, including close reading, critical interpretation, and the use of literary terminology.');
        expect(mockGetRes.data.faculty).toBe('Jared Guzman');
        expect(mockGetRes.data.creditHours).toBe(3);
        expect(mockGetRes.data.books).toBe('All The Light We Cannot See');
    }, 10000);

    describe('CREATE tests', () => {
        // POST new course
        // *working*
        it('should create a new course', async () => {
            const mockReq = {
                body: {
                    name: mockCourse.name,
                    subject: mockCourse.subject,
                    code: mockCourse.code,
                    section: mockCourse.section,
                    description: mockCourse.description,
                    faculty: mockCourse.faculty,
                    creditHours: mockCourse.creditHours,
                    books: mockCourse.books
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
        
            await courseController.createCourse(mockReq, mockRes);
            newCourseId = mockRes.data._id;
            console.log("newCourseId: ", newCourseId);
        
            expect(mockRes.statusCode).toBe(201);
            expect(mockRes.data._id).toBe(mockRes.data._id);
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
        
            await courseController.createCourse(mockReq, mockRes);
        
            expect(mockRes.data.message).toBe("Course validation failed: name: Path `name` is required., subject: Path `subject` is required., code: Path `code` is required., section: Path `section` is required., description: Path `description` is required., faculty: Path `faculty` is required., creditHours: Path `creditHours` is required., books: Path `books` is required.");
            expect(mockRes.statusCode).toBe(400);
        }, 10000);

    });

    // PUT update new course
    // *NOT working*
    it('should update the new course', async () => {
        if (newCourseId) {
            courseId = newCourseId;
        } else {
            console.log("PUT course - newCourseId error");
            return;
        }
        const altCourse = {
            name: "Introduction to Endings",
            subject: "Endings",
            code: "INTRO 401",
            section: "002",
            description: "An introduction to endings.",
            faculty: "Jared Guzman",
            creditHours: 2,
            books: "Endings"
        };
        const mockPutReq = {
            params: {
                id: courseId
            },
            body: {
                name: altCourse.name,
                subject: altCourse.subject,
                code: altCourse.code,
                section: altCourse.section,
                description: altCourse.description,
                faculty: altCourse.faculty,
                creditHours: altCourse.creditHours,
                books: altCourse.books
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
    
        await courseController.updateCourse(mockPutReq, mockPutRes);
    
        console.log("mockPutRes.data: ", mockPutRes.data);
        expect(mockPutRes.statusCode).toBe(204);
        expect(mockPutRes.data.name).toBe('Introduction to Endings');
        expect(mockPutRes.data.subject).toBe('Endings');
        expect(mockPutRes.data.code).toBe('INTRO 401');
        expect(mockPutRes.data.section).toBe('002');
        expect(mockPutRes.data.description).toBe('An introduction to endings.');
        expect(mockPutRes.data.faculty).toBe('Jared Guzman');
        expect(mockPutRes.data.creditHours).toBe(2);
        expect(mockPutRes.data.books).toBe('Endings'); 
    }, 10000);

    // DELETE 1 course
    // *working*
    it('should delete 1 course', async () => {
        if (newCourseId) {
            courseId = newCourseId;
        } else {
            console.log("Deletion error. newCourseId failed.");
            return;
        }
        const mockDeleteReq = {
            params: {
              id: courseId
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

        await courseController.deleteCourse(mockDeleteReq, mockDeleteRes);

        expect(mockDeleteRes.statusCode).toBe(200);
    }, 10000);
});