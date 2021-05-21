var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var mainRouter=require('./routes/main');
var callRouter = require('./routes/call');
var delRouter = require('./routes/del');
var createRouter = require('./routes/create');
var changeRouter = require('./routes/change');
var delsendRouter = require('./routes/delsend');
var agreeRouter=require('./routes/agree');
var app = express();
// view engine setup视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');//

app.use(logger('dev'));//日志功能
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//静态文件路径设置
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(loginRouter);
app.use(mainRouter);
app.use(callRouter);
app.use(delRouter);
app.use(createRouter);
app.use(changeRouter);
app.use(delsendRouter);
app.use(agreeRouter);
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
  res.render('error');
});

module.exports = app;
