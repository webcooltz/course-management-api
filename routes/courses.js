// Course route
const express = require('express');
const router = express.Router();
// const studentController = require('../controllers/student');
// const isAuth = require("../util/authToken");

router.get('/', () => {
    // #swagger.tags = ['Course']
});

router.get('/:id', () => {
    // #swagger.tags = ['Course']
});

router.post('/', () => {
    // #swagger.tags = ['Course']
} );

router.put('/:id', () => {
    // #swagger.tags = ['Course']
});

router.delete('/:id', () => {
    // #swagger.tags = ['Course']
});

module.exports = router;