const express = require('express');
const { deleteReview, updateReview, getReviews, getReview, addReview } = require('../controllers/reviews');
const Review = require('../models/Review');
const advancedResults = require('../middleware/advancedResults');
const router = express.Router({mergeParams: true});
const Roles = require('../utils/roles');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(advancedResults(Review, {
        path: 'bootcamp', select: 'name description'
    }), getReviews)
    .post(protect, authorize(Roles.USER, Roles.ADMIN), addReview);

router.route('/:id')
    .get(getReview)
    .put(protect, authorize(Roles.USER, Roles.ADMIN), updateReview)
    .delete(protect, authorize(Roles.USER, Roles.ADMIN), deleteReview);

module.exports = router;