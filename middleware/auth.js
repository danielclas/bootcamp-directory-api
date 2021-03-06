const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

exports.protect = asyncHandler(async (req,res,next) => {
    let token = req.headers.authorization;

    if(token && token.startsWith('Bearer')){
        token = token.split(' ')[1];
    }else if(req.cookies.token){
        token = req.cookies.token;
    }

    //Make sure token exists
    if(!token) return next(new ErrorResponse('Unauthorized', 401));

    try{
        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        req.user = await User.findById(decoded.id);

        next();
    }catch(err){
        return next(new ErrorResponse('Unauthorized', 401));
    }
});

//Grant access to specific roles
exports.authorize = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorResponse('Unauthorized', 401));
        }
        next();
    }
}