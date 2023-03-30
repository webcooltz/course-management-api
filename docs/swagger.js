const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
    info: {
        title: "Easel",
        description: "Administrative management for online education",
    },
    servers: [
        {
            url: "https://cse341-course-mgmt.onrender.com/",
            description: "Remote Server",
        },
        {
            url: "http://localhost:3000/",
            description: "Local Server",
        },
    ],
    tags: [
        { name: "Course", description: "Operations about courses" },
        { name: "Student", description: "Operations about students" },
        { name: "Faculty", description: "Operations about faculty" },
        { name: "Book", description: "Operations about books" },
    ],
    definitions: {
        Course: {
            name: "Intro to English",
            subject: "ENG",
            code: "101",
            section: "03",
            description: "Beginning English course for college level reading.",
            creditHours: 2.0,
            faculty: "Ahab Whalechaser",
            books: "Moby Dick",
        },
        Student: {
            firstName: "John",
            lastName: "Smith",
            email: "jsmith@test.com",
            creditHours: 25,
        },
        Faculty: {
            firstName: "Ahab",
            lastName: "Whalechaser",
            bio: "When I'm not chasing after the big one or grading papers, I like to read the classics.",
            email: "awhalechaser@literatureisreal.com",
        },
        Book: {
            title: "Dune",
            author: "Frank Herbert",
            pages: "412",
            genre: "Science Fiction",
            publishYear: "1965",
        },
    },
    components: {
        securitySchemes: {
            oAuth: {
                type: "oauth2",
                description: "Login with Auth0",
                flows: {
                    implicit: {
                        authorizationUrl:
                            "https://dev-q5esml8wamkz6d2u.us.auth0.com/authorize?audience=https://cse341-course-mgmt.onrender.com/",
                        scopes: {},
                    },
                },
            },
        },
    },
};



const outputFile = "./docs/swagger.json";
const endpointFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFiles, doc);
