const express = require('express');
const { bootcampPhotoUpload, getBootcampsInRadius, getBootcamps, getBootcamp, createNewBootcamp, updateBootcamp, deleteBootcamp }
= require('../controllers/bootcamps');
const advancedResults = require('../middleware/advancedResults');
const Bootcamp = require('../models/Bootcamp');
const { protect, authorize } = require('../middleware/auth');
const Roles = require('../utils/roles');

//Include other resource routers
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');


const router = express.Router();

//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

//Associate a route within our bootcamp subroute to different controllers
//On server.js, /api/v1/bootcamps is associated with this file
router.route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius);
router.route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(protect, authorize('publisher', Roles.ADMIN), createNewBootcamp);
router.route('/:id')
    .get(getBootcamp)
    .put(protect, authorize(Roles.PUBLISHER, Roles.ADMIN), updateBootcamp)
    .delete(protect, authorize(Roles.PUBLISHER, Roles.ADMIN), deleteBootcamp);
router.route('/:id/photo')
    .put(protect, authorize(Roles.PUBLISHER, Roles.ADMIN), bootcampPhotoUpload)

module.exports = router;