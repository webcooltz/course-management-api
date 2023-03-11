// Course route
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');
// const isAuth = require("../util/authToken");

router.get('/', courseController.getAll);

router.get('/:id', courseController.getSingle);

router.post('/', courseController.createCourse);

router.put('/:id', courseController.updateCourse);

router.delete('/:id', courseController.deleteCourse);

module.exports = router;