const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const xssClean = require('xss-clean');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
//Load ENV vars
dotenv.config({path: './config/config.env'});

//Connect to mongo DB
connectDB();

//Router files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

//Initialize app var with express
const app = express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Use logger middleware on all requests when ENV = dev
if(process.env.NODE_ENV === 'development') app.use(logger('dev'));

//File uploading
app.use(fileUpload());

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent XXS
app.use(xssClean());

//Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, //10 mins
    max: 100
});

app.use(limiter);

//Prevent HTTP param pollution
app.use(hpp());

//Enable CORS
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

//Use error handler middleware
app.use(errorHandler);

//PORT from config file
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold ));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close server and exit process
    server.close(() => process.exit(1));
});