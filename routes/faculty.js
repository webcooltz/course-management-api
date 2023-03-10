// faculty route
const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/faculty');
// const isAuth = require("../util/authToken");

router.get('/', facultyController.getAll);

router.get('/:id', facultyController.getSingle);

router.post('/', facultyController.createFaculty);

router.put('/:id', facultyController.updateFaculty);

router.delete('/:id', facultyController.deleteFaculty);

module.exports = router;