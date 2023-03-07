const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });



const doc = {
    info: {
        title: "Easel",
        description: "Administrative management for online education"
    },
    servers: [
        {
            url: "https://rpg-pvd4.onrender.com/",
            description: "Remote Server",
        },
        {
            url: "http://localhost:3000/",
            description: "Local Server",
        },
    ],
    tags: {
        name: "Course",
        name: "Student",
        name: "Faculty",
        name: "Book"
    },
    definitions: {
        Course: {
            name: "Intro to English",
            subject: "ENG",
            code: "101",
            description: "Beginning English course for college level reading.",
            creditHours: "2.0",
            professor: "Ahab Whalechaser"
        },
        Student: {
            firstName: "John",
            lastName: "Smith",
            email: "jsmith@test.com"
        },
        Faculty: {
            firstName: "Ahab",
            lastName: "Whalechaser",
            bio: "When I'm not chasing after the big one or grading papers, I like to read the classics.",
            email: "awhalechaser@literatureisreal.com"
        },
        Book: {
            title: "Dune",
            author: "Frank Herbert",
            pages: "412",
            genre: "Science Fiction",
            publishYear: "1965",
            invCount: "6"
        },
    },
};

const outputFile = "./docs/swagger.json";
const endpointFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFiles, doc);