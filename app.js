var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('client-sessions');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var boardsRouter = require('./routes/boards')
var sequelize = require('sequelize');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));

app.use('/login', loginRouter);
function requireLogin (req, res, next) {
  console.log('user', req.session.user);
  if (!req.session.user) {
    console.log('redirecting')
    res.redirect('/login')
    return;
  } else {
    next();
  }
};
app.use('/boards', requireLogin);
app.use('/users', requireLogin);
app.use('/', requireLogin);
app.use('/boards', boardsRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/login');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
