// faculty route
const express = require('express');
const router = express.Router();
// const studentController = require('../controllers/student');
// const isAuth = require("../util/authToken");

router.get('/', () => {
    // #swagger.tags = ['Faculty']
});

router.get('/:id', () => {
    // #swagger.tags = ['Faculty']
});

router.post('/', (req, res) => {
    // #swagger.tags = ['Faculty']
    const faculty = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio: req.bio.body,
        email: req.body.email,
    };
} );

router.put('/:id', (req, res) => {
    // #swagger.tags = ['Faculty']
    const faculty = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio: req.bio.body,
        email: req.body.email,
    };
});

router.delete('/:id', () => {
    // #swagger.tags = ['Faculty']
});

module.exports = router;