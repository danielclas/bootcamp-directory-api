const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req,res,next) => {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({succes:true, data:bootcamps});
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
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    res.status(200).json({success: true, count: bootcamps.length, data: {}});
})


