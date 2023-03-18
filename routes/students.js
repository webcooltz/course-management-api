// student route
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
// const isAuth = require("../util/authToken");
const OAuth = require("../middleware/authorize");

router.get('/', studentController.getAll);

router.get('/:id', studentController.getSingle);

router.post('/', OAuth.checkLoggedIn, studentController.createStudent);

router.put('/:id', OAuth.checkLoggedIn, studentController.updateStudent);

router.delete('/:id', OAuth.checkLoggedIn, studentController.deleteStudent);

module.exports = router;