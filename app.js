let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let methodOverride = require('method-override');

let app = express();

require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

//requiring routes
let index = require('./routes/index');
app.use('/', index);

let users = require('./routes/users');
app.use('/users', users);

let bucketLists = require('./routes/bucketLists');
app.use('/users/:userId/bucketLists', bucketLists);

let activities = require('./routes/activityList');
app.use('/users/:userId/bucketLists/:bucketId/activityList', activities);

let userBucketLists = require('./routes/userBucketLists');
app.use('/users/:userId/userBucketLists', userBucketLists);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;