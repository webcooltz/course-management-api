// material/book route
const express = require('express');
const router = express.Router();
// const studentController = require('../controllers/student');
// const isAuth = require("../util/authToken");

router.get('/', () => {
    // #swagger.tags = ['Book']
});

router.get('/:id', () => {
    // #swagger.tags = ['Book']
});

router.post('/', (req, res) => {
    // #swagger.tags = ['Book']
    const book = {
        title: req.body.title,
        author: req.body.author,
        pages: req.pages.body,
        genre: req.body.genre,
        publishYear: req.body.publishYear,
    };
} );

router.put('/:id', (req, res) => {
    // #swagger.tags = ['Book']
    const book = {
        title: req.body.title,
        author: req.body.author,
        pages: req.pages.body,
        genre: req.body.genre,
        publishYear: req.body.publishYear,
    };
});

router.delete('/:id', () => {
    // #swagger.tags = ['Book']
});

module.exports = router;