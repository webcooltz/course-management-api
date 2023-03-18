// faculty route
const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/faculty');
// const isAuth = require("../util/authToken");
const OAuth = require("../middleware/authorize");

router.get('/', facultyController.getAll);

router.get('/:id', facultyController.getSingle);

router.post('/', OAuth.checkLoggedIn, facultyController.createFaculty);

router.put('/:id', OAuth.checkLoggedIn, facultyController.updateFaculty);

router.delete('/:id', OAuth.checkLoggedIn, facultyController.deleteFaculty);

module.exports = router;