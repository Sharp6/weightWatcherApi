var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var moment = require('moment');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

var app = express();

if(app.get('env') === "development") {
  require('dotenv').load({path: '/home/pi/apps/weightWatcherApi/.env'});
  //require('dotenv').load();
  console.log("Loading dotEnv.");
}

// Mongoose ODM
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECT_STRING);

var utils = require('./utils')();

var Goal = require('./models/goal.model.server')(mongoose);
var goalDA = require('./da/goal.da.server')(Goal);
var goalCtrl = require('./controllers/goal.controller.server')(goalDA);
var goalRoutes = require('./routes/goal.routes.server')(goalCtrl);

var Observation = require('./models/observation.model.server')(mongoose);
var observationDA = require('./da/observation.da.server')(Observation);
var analyzer = require('./observationAnalyzer')(goalDA,observationDA,moment,utils);
var observationCtrl = require('./controllers/observation.controller.server')(observationDA, analyzer, utils);
var observationRoutes = require('./routes/observation.routes.server')(observationCtrl);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(allowCrossDomain);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/', observationRoutes);
app.use('/', goalRoutes);
app.use('/users', users);

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
