// material/book route
const express = require('express');
const router = express.Router();
// const studentController = require('../controllers/student');
// const isAuth = require("../util/authToken");

router.get('/', () => {
    // #swagger.tags = ['Book']
});

router.get('/:id', () => {
    // #swagger.tags = ['Book']
});

router.post('/', () => {
    // #swagger.tags = ['Book']
} );

router.put('/:id', () => {
    // #swagger.tags = ['Book']
});

router.delete('/:id', () => {
    // #swagger.tags = ['Book']
});

module.exports = router;