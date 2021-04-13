const express = require('express');
const { getBootcamps, getBootcamp, createNewBootcamp, updateBootcamp, deleteBootcamp }
= require('../controllers/bootcamps');
const router = express.Router();

router.route('/')
    .get(getBootcamps)
    .post(createNewBootcamp);

router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = router;