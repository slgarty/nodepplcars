const router = require('express').Router();
const people = require('./people');

router.use('/people', people);

module.exports = router;