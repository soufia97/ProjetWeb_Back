const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/database.config');

const artistRouter = require('./routes/artist');

const albumRouter = require('./routes/album');

const trackRouter = require('./routes/track');


// on se connecte à la base de données
mongoose.connect('mongodb://localhost:27017/projet', {useNewUrlParser: true});
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/artist', artistRouter);
app.use('/album', albumRouter);
app.use('/track', trackRouter);

module.exports = app;
