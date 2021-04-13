const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');

//Router files
const bootcamps = require('./routes/bootcamps');

//Load ENV vars
dotenv.config({path: './config/config.env'});

//Initialize app var with express
const app = express();

//Use logger middleware on all requests when ENV = dev
if(process.env.NODE_ENV === 'development') app.use(logger('dev'));

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);

//PORT from config file
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}` ));