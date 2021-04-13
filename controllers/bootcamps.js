// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = (req,res,next) => {
    res.status(200).json({success: true, msg: 'Show all bootcamps'});
}

// @desc Get a single bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = (req,res,next) => {
    res.status(200).json({success: true, msg: 'Show one bootcamp'});
}

// @desc Create a bootcamp
// @route POST /api/v1/bootcamps
// @access Private
exports.createNewBootcamp = (req,res,next) => {
    res.status(200).json({success: true, msg: 'Create a bootcamp'});
}

// @desc Update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = (req,res,next) => {
    res.status(200).json({success: true, msg: 'Update a bootcamp'});
}

// @desc Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = (req,res,next) => {
    res.status(200).json({success: true, msg: 'Delete a bootcamp'});
}


