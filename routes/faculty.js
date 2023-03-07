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

router.post('/', () => {
    // #swagger.tags = ['Faculty']
} );

router.put('/:id', () => {
    // #swagger.tags = ['Faculty']
});

router.delete('/:id', () => {
    // #swagger.tags = ['Faculty']
});

module.exports = router;