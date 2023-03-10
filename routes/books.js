// book route
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');
// const isAuth = require("../util/authToken");

router.get('/', bookController.getAll);

router.get('/:id', bookController.getSingle);

router.post('/', bookController.createBook);

router.put('/:id', bookController.updateBook);

router.delete('/:id', bookController.deleteBook);

module.exports = router;