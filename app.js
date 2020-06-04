const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

require('dotenv').config();

const musicItemRoutes = require('./routes/api/musicItems');
const contactAdminRoutes = require('./routes/api/contactAdmin');
const userAccountRoutes = require('./routes/api/userAccount');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('Connection with Atlas was established with success'))
.catch(err => console(err));

app.use('/api/music', musicItemRoutes);
app.use('/api/contact', contactAdminRoutes);
app.use('/api/user', userAccountRoutes);



module.exports = app;