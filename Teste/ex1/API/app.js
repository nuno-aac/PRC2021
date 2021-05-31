var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var emdRouter = require('./routes/emd');
var modalidadesRouter = require('./routes/modalidades');
var atletasRouter = require('./routes/atletas');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())

app.use('/emd', emdRouter);
app.use('/modalidades', modalidadesRouter);
app.use('/atletas', atletasRouter);

module.exports = app;
