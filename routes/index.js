const express = require('express');
const router = express.Router();

router.use('/login', require('./login'));
router.use('/students', require('./students'));
// router.use('/faculty', require('./faculty'));
// router.use('/books', require('./books'));
// router.use('/courses', require('./courses'));
router.use('/api-docs', require('./swagger'));

router.get('/', function(req, res, next) {
  res.send('welcome :)');
});

router.get('*', (req, res) => {
  res.send('404: oops, bad request!');
});

module.exports = router;