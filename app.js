var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./connectDB.js')
var routes = require('./routes/index');



// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
/*
 * extends express reponse object
 */
express.response.sendError = function(mess) {
    this.send({
        status: 0,
        mess: mess,
        data: null
    });
}
express.response.sendSuccess = function(mess) {
    this.send({
        status: 1,
        mess: mess,
        data: null
    });
}
express.response.sendData = function(data, mess) {
    this.send({
        status: 1,
        mess: mess,
        data: data
    });
}
express.response.sendRedirect = function(url) {
    this.send({
        status: 2,
        mess: url,
        data: null
    });
}
var app = express();
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/storage/public/logo.jpg'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/views')));
app.use(express.static(path.join(__dirname, '/storage/public')));

// give the routes to control the require
routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
