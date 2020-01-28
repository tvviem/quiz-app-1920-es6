if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
import createError from 'http-errors';
import express from 'express';
import session from 'express-session'; 
const MongoStore = require('connect-mongo')(session);
import passport from 'passport';
import { initialize } from './security/configPassport';
initialize(passport);

import { join } from 'path';
import logger from 'morgan';
//import cookieParser from 'cookie-parser';
//import {morgan as httpLogger} from './routes/middlewares/httpLogger'
import sassMiddleware from 'node-sass-middleware';
import mongoCon from './database/dbconnect';
// import { BaseUser } from './models/business/users/baseUserSchema';
// IMPORT ALL ROUTE HERE: route MVC and RestAPI
import indexRouter from './routes/index.routes';

var app = express();
// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');
//app.engine('pug', require('pug').renderFile);

// ALL Middlewares here
app.use(logger('dev'));
// app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // extended=true allow post nested object json

app.use(sassMiddleware({
  src: join(__dirname, '../public'),
  dest: join(__dirname, '../public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
  debug: true // to show error when not locate file
}));
app.use(express.static(join(__dirname, '../public')));
// Enable CORS from client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

/**
 * -------------- SESSION SETUP ----------------
 */
/**
 * The MongoStore is used to store session data.  We will learn more about this in the post.
 * 
 * Note that the `connection` used for the MongoStore is the same connection that we are using above
 */
const sessionStore = new MongoStore({ mongooseConnection: mongoCon, collection: 'sessions' })
const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    // secure: true,
    // httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('flash')()); // here, because require session
// flush session to clear old messages foreach each requests
app.use((req, res, next) => {
  if (req.session && req.session.flash && req.session.flash.length > 0) {
    req.session.flash = [];
  }
  next();
});

// ROUTE FOR WEB MVC
app.use('/', indexRouter);

// Test passport
app.get('/login-success', (req, res, next) => {
  console.log(req.session);
  res.send('You successfully logged in.');
});
app.get('/login-failure', (req, res, next) => {
  res.send('You entered the wrong password.');
});


// catch 404 and forward to error handler
/* app.use(function(req, res, next) {
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
}); */

if(app.get('NODE_ENV') === 'production') { // when build to production
  // Copy all folder from ./src/views to ./dist/views
  // change logger module from dev --> prod using morgan
  console.log('INSIDE config when prod');
}

export default app;
