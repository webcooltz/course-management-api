// student route
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
// const isAuth = require("../util/authToken");

router.get('/', studentController.getAll);

router.get('/:id', studentController.getSingle);

router.post('/', studentController.createStudent);

router.put('/:id', studentController.updateStudent);

router.delete('/:id', studentController.deleteStudent);

module.exports = router;