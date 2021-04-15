const express = require('express');
const { getBootcampsInRadius, getBootcamps, getBootcamp, createNewBootcamp, updateBootcamp, deleteBootcamp }
= require('../controllers/bootcamps');

//Include other resource routers
const courseRouter = require('./courses');

const router = express.Router();

//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

//Associate a route within our bootcamp subroute to different controllers
//On server.js, /api/v1/bootcamps is associated with this file
router.route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius);
router.route('/')
    .get(getBootcamps)
    .post(createNewBootcamp);
router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = router;