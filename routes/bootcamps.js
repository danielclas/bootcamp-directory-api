const express = require('express');
const { getBootcamps, getBootcamp, createNewBootcamp, updateBootcamp, deleteBootcamp }
= require('../controllers/bootcamps');
const router = express.Router();

//Associate a route within our bootcamp subroute to different controllers
//On server.js, /api/v1/bootcamps is associated with this file
router.route('/')
    .get(getBootcamps)
    .post(createNewBootcamp);

router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = router;