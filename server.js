const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');

//Load ENV vars
dotenv.config({path: './config/config.env'});

//Connect to mongo DB
connectDB();

//Router files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

//Initialize app var with express
const app = express();

//Body parser
app.use(express.json());

//Use logger middleware on all requests when ENV = dev
if(process.env.NODE_ENV === 'development') app.use(logger('dev'));

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

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