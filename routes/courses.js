// Course route
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');
// const isAuth = require("../util/authToken");
const OAuth = require("../middleware/authorize");

router.get('/', courseController.getAll);

router.get('/:id', courseController.getSingle);

router.post('/', OAuth.checkLoggedIn, courseController.createCourse);

router.put('/:id', OAuth.checkLoggedIn, courseController.updateCourse);

router.delete('/:id', OAuth.checkLoggedIn, courseController.deleteCourse);

module.exports = router;