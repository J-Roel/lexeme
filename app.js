var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').config();
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');



//Require all of our routes
//var routes = require('./routes/index');
var users = require('./routes/users');
var companies = require('./routes/companies');
var tracker = require('./routes/tracker');
var projects = require('./routes/projects');
var auth = require('./routes/auth');

var cors = require('cors');

var corsOptions = {
  origin: 'https://lexeme.tech'
};
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*')

});

var app = express();


//Tell our app to use cors
app.use(cors(corsOptions));

// We are going to protect /api routes with JWT
app.use('/', expressJwt(
  {
    secret: process.env.TOKEN_SECRET
  }).unless({path: ['/auth', '/users/']}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app.use('/', routes);
app.use('/users', users);
app.use('/companies', companies);
app.use('/tracker', tracker);
app.use('/projects', projects);
app.use('/auth', auth);




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