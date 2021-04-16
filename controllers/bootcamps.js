const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');
const path = require('path');
// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req,res,next) => {   
    res.status(200).json(res.advancedResults);
})

// @desc Get a single bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = asyncHandler(async (req,res,next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);    
    res.status(200).json({success:true, data:bootcamp});    
})

// @desc Create a bootcamp
// @route POST /api/v1/bootcamps
// @access Private
exports.createNewBootcamp = asyncHandler(async (req,res,next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
        success: true,
        data: bootcamp
    });
})

// @desc Update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = asyncHandler(async(req,res,next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true,
        runValidators: true}
    )

    res.status(200).json({success: true, data: bootcamp});
})

// @desc Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = asyncHandler(async (req,res,next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if(!bootcamp){
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    bootcamp.remove();

    res.status(200).json({success: true, count: bootcamp.length, data: {}});
})

// @desc Get bootcamps within a radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distances
// @access Private
exports.getBootcampsInRadius = asyncHandler(async (req,res,next) => {
    const {zipcode, distance} = req.params;

    //Get LAT/LONG from geocoder
    const location = await geocoder.geocode(zipcode);
    const latitude = location[0].latitude;
    const longitude = location[0].longitude;

    //Calc radius using radians
    //Divide dist by radius of Earth
    //Earth's radius = 3.963m
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location: {$geoWithin: { $centerSphere: [ [longitude, latitude], radius]}}
    });

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
})

// @desc Upload photo for bootcamp
// @route PUT /api/v1/bootcamps/:id/photo
// @access Private
exports.bootcampPhotoUpload = asyncHandler(async (req,res,next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if(!bootcamp){
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    if(!req.files){
        return next(
            new ErrorResponse(`Please upload a file`, 400)
        );
    }

    const file = req.files.file;

    //Make sure image is a photo
    if(!file.mimetype.startsWith('image')){        
        return next(
            new ErrorResponse(`Please upload an image file`, 400)
        );
    }

    //Check file size
    if(file.size > process.env.MAX_FILE_UPLOAD){       
        return next(
            new ErrorResponse('Please upload an image less than 10MB', 400)
        );
    }

    //Create custom filename
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

    //Move file to public folder
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {      
        if(err){
            return next(
                new ErrorResponse('Problem with file upload', 500)
            );
        }

        await Bootcamp.findByIdAndUpdate(req.params.id, {photo: file.name});    

        res.status(200).json({success: true, data: file.name});  
    });

})

