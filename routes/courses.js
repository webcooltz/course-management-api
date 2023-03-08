// Course route
const express = require('express');
const router = express.Router();
// const studentController = require('../controllers/student');
// const isAuth = require("../util/authToken");

router.get('/', () => {
    // #swagger.tags = ['Course']
});

router.get('/:id', () => {
    // #swagger.tags = ['Course']
});

router.post('/', (req, res) => {
    // #swagger.tags = ['Course']
    const course = {
        name: req.body.name,
        subject: req.body.subject,
        code: req.code.body,
        section: req.body.section,
        description: req.body.description,
        faculty: req.body.faculty,
        creditHours: req.body.creditHours,
        books: req.body.books,
    };
});

router.put('/:id', (req, res) => {
    // #swagger.tags = ['Course']
    const course = {
        name: req.body.name,
        subject: req.body.subject,
        code: req.code.body,
        section: req.body.section,
        description: req.body.description,
        faculty: req.body.faculty,
        creditHours: req.body.creditHours,
        books: req.body.books,
    };
});

router.delete('/:id', () => {
    // #swagger.tags = ['Course']
});

module.exports = router;