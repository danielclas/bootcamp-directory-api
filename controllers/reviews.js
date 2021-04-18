const express = require('express');
const { } = require('./reviews');
const Review = require('../models/Review');
const advancedResults = require('../middleware/advancedResults');
const router = express.Router({mergeParams: true});
const { protect, authorize } = require('../middleware/auth');
const asyncHandler = require('../middleware/async'); 

// @desc Get reviews
// @route GET /api/v1/reviews
// @route GET /api/v1/bootcamps/:bootcampId/reviews
// @access Public
exports.getReviews = asyncHandler(async (req, res, next) => {

    if(req.params.bootcampId){
        const reviews = await Review.find({bootcamp: req.params.bootcampId});
        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: courses
        })
    }else{
        res.status(200).json(res.advancedResults);
    }
});