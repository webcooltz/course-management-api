const request = require('supertest');
const app = require('../index');
const mongodb = require('../db/connect');
const port = process.env.PORT || 3000;
const bookController = require('../controllers/book');

describe('Book tests', () => {
    const mockBook = {
        title: "The Nightingale",
        author: "Kristin Hannah",
        pages: "438",
        genre: "Historical Fiction",
        publishYear: "2015"
    };      
    const defaultId = '640797c654411daf5940305b';
    let newBookId;
    let bookId;

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

    // GET /books response
    // *working*
    it('route should respond with status 200', (done) => {
        request(app)
            .get('/books')
            .expect(200)
            .end((err, res) => { 
            if (err) return done.fail(err);
            done();
        });
    });

    // GET all books
    // *working*
    it('should get all books', async () => {
        const response = await request(app).get('/books');

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
    }, 10000);

     // GET 1 book
    // *working*
    it('should get 1 book', async () => {
        bookId = defaultId;
        const mockGetReq = {
            params: {
              id: bookId
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

        await bookController.getSingle(mockGetReq, mockGetRes);

        expect(mockGetRes.statusCode).toBe(200);
        expect(mockGetRes.data.title).toBe('All The Light We Cannot See');
        expect(mockGetRes.data.author).toBe('Anthony Doerr');
        expect(mockGetRes.data.pages).toBe('554');
        expect(mockGetRes.data.genre).toBe("Historical Fiction");
        expect(mockGetRes.data.publishYear).toBe('2014');
    }, 10000);

    describe('CREATE tests', () => {
        // POST new book
        // *working*
        it('should create a new book', async () => {
            const mockReq = {
                body: {
                    title: mockBook.title,
                    author: mockBook.author,
                    pages: mockBook.pages,
                    genre: mockBook.genre,
                    publishYear: mockBook.publishYear
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
        
            await bookController.createBook(mockReq, mockRes);
            newBookId = mockRes.data.book._id;
        
            expect(mockRes.data.message).toBe("Created new book successfully.");
            expect(mockRes.statusCode).toBe(201);
            expect(mockRes.data.book.title).toBe('The Nightingale');
            expect(mockRes.data.book.author).toBe('Kristin Hannah');
            expect(mockRes.data.book.pages).toBe('438');
            expect(mockRes.data.book.genre).toBe("Historical Fiction");
            expect(mockRes.data.book.publishYear).toBe('2015');
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
        
            await bookController.createBook(mockReq, mockRes);
        
            expect(mockRes.data.message).toBe("Book validation failed: title: Path `title` is required., author: Path `author` is required., pages: Path `pages` is required., genre: Path `genre` is required., publishYear: Path `publishYear` is required.");
            expect(mockRes.statusCode).toBe(400);
        }, 10000);

    });

    // PUT update new book
    // *working*
    it('should update the new book', async () => {
        if (newBookId) {
            bookId = newBookId;
        } else {
            console.log("PUT book - newBookId error");
            return;
        }
        const altBook = {
            title: "The Argonian Maid",
            author: "Crassius Curio",
            pages: "150",
            genre: "Fiction",
            publishYear: "2011"
        };
        const mockPutReq = {
            params: {
                id: bookId
            },
            body: {
                title: altBook.title,
                author: altBook.author,
                pages: altBook.pages,
                genre: altBook.genre,
                publishYear: altBook.publishYear
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
    
        await bookController.updateBook(mockPutReq, mockPutRes);
    
        expect(mockPutRes.data.message).toBe("Updated book successfully.");
        expect(mockPutRes.statusCode).toBe(204);
        expect(mockPutRes.data.book.title).toBe('The Argonian Maid');
        expect(mockPutRes.data.book.author).toBe('Crassius Curio');
        expect(mockPutRes.data.book.pages).toBe('150');
        expect(mockPutRes.data.book.genre).toBe("Fiction");
        expect(mockPutRes.data.book.publishYear).toBe('2011');
    }, 10000);

    // DELETE 1 book
    // *working*
    it('should delete 1 book', async () => {
        if (newBookId) {
            bookId = newBookId;
        } else {
            console.log("Deletion error. newBookId failed.");
            return;
        }
        const mockDeleteReq = {
            params: {
              id: bookId
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

        await bookController.deleteBook(mockDeleteReq, mockDeleteRes);

        expect(mockDeleteRes.statusCode).toBe(200);
        expect(mockDeleteRes.data.message).toBe("Deleted book successfully.");
    }, 10000);
});