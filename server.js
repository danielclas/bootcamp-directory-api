const express = require('express');
const dotenv = require('dotenv');

//Load ENV vars
dotenv.config({path: './config/config.env'});

//Initialize app var with express
const app = express();

//PORT from config file
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}` ));