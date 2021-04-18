const express = require('express');
const { getCourses, getCourse, addCourse, updateCourse, deleteCourse} = require('../controllers/courses');
const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults');
const router = express.Router({mergeParams: true});
const Roles = require('../utils/roles');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(advancedResults(Course, {
        path: 'bootcamp', select: 'name description'
    }), getCourses)
    .post(protect, authorize(Roles.PUBLISHER, Roles.ADMIN), addCourse);

router.route('/:id')
    .get(getCourse)
    .put(protect, authorize(Roles.PUBLISHER, Roles.ADMIN), updateCourse)
    .delete(protect, authorize(Roles.PUBLISHER, Roles.ADMIN), deleteCourse);

module.exports = router;