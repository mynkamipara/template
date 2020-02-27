var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
const expressLayouts = require('express-ejs-layouts');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
var mongoose=require('mongoose');
const flash = require('connect-flash');
var rand = require("random-key");
var routes = require('./routes/index');
var users = require('./routes/users');
var crud= require('./routes/crud');
var test = require('./routes/test');

//mysql config

var mysql = require('mysql');
var connection  = require('./config/mysql');

// Passport Config
require('./config/passport')(passport);

var app = express();

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


 // Connect flash
 app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/crud', crud);
app.use('/test', test);







// mongoDb Connection
mongoose.connect('mongodb://localhost:27017/signup', {useNewUrlParser: true});

mongoose.connection.on('connected', function(){
    console.log("Mongoose connected");
});

mongoose.connection.on('error', function(){
    console.log("Mongoose coonection error");
});




/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
