// book route
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');
// const isAuth = require("../util/authToken");
const OAuth = require("../middleware/authorize");

router.get('/', bookController.getAll);

router.get('/:id', bookController.getSingle);

router.post('/', OAuth.checkLoggedIn, bookController.createBook);

router.put('/:id', OAuth.checkLoggedIn, bookController.updateBook);

router.delete('/:id', OAuth.checkLoggedIn, bookController.deleteBook);

module.exports = router;