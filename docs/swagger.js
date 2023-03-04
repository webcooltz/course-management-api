const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "RPG",
        description: "RPG API for BYUI CSE 341"
    },
    host: "rpg-pvd4.onrender.com",
    schemes: ["https"]
};

const outputFile = "./docs/swagger.json";
const endpointFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFiles, doc);