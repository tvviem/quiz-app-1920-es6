import createError from 'http-errors';
import express from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sassMiddleware from 'node-sass-middleware';

import indexRouter from './routes';

var app = express();

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');
//app.engine('pug', require('pug').renderFile);

 // logger giai doan dev, hien thi cac thong tin co ban. Khi production, nen ghi ra file luu server
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(sassMiddleware({
  src: join(__dirname, '../public'),
  dest: join(__dirname, '../public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
  debug: true // to show error when not locate file
}));

app.use(express.static(join(__dirname, '../public')));

app.use('/', indexRouter);

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

if(app.get('NODE_ENV') === 'production') { // when build to production
  // Copy all folder from ./src/views to ./dist/views
  // change logger module from dev --> prod using morgan
  console.log('INSIDE config when prod');
}

export default app;
