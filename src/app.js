import createError from 'http-errors';
import express from 'express';
import session from 'express-session'; 
const MongoStore = require('connect-mongo')(session);
import passport from 'passport';
// import crypto from 'crypto';
var LocalStrategy = require('passport-local').Strategy;

import { join } from 'path';
import logger from 'morgan';
//import cookieParser from 'cookie-parser';
//import {morgan as httpLogger} from './routes/middlewares/httpLogger'
import sassMiddleware from 'node-sass-middleware';
import mongoCon from './database/dbconnect';
import { BaseUser } from './models/business/users/baseUserSchema';
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

/* app.use(sassMiddleware({
  src: join(__dirname, '../public'),
  dest: join(__dirname, '../public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
  debug: true // to show error when not locate file
})); */
app.use(express.static(join(__dirname, '../public')));

/**
 * This function is called when the `passport.authenticate()` method is called.
 * 
 * If a user is found an validated, a callback is called (`cb(null, user)`) with the user
 * object.  The user object is then serialized with `passport.serializeUser()` and added to the 
 * `req.session.passport` object. 
 */
passport.use(new LocalStrategy(
  (userName, passWord, cb) => {
    BaseUser.find({ username: userName }).then((user) => {
      if(!user) {
        cb(null, false);
      }
      const isValid = validPassword(passWord, user.hash, user.salt);
      if(isValid) {
        return cb(null, user);
      } else {
        return cb(null, false);
      }
    })
  })
);

/**
 * This function is used in conjunction with the `passport.authenticate()` method.  See comments in
 * `passport.use()` above ^^ for explanation
 */
passport.serializeUser(
  (user, cb) => {
    cb(null, user.id);
  }
);

/**
 * This function is used in conjunction with the `app.use(passport.session())` middleware defined below.
 * Scroll down and read the comments in the PASSPORT AUTHENTICATION section to learn how this works.
 * 
 * In summary, this method is "set" on the passport object and is passed the user ID stored in the `req.session.passport`
 * object later on.
 */
passport.deserializeUser(
  (id, cb) => {
    User.findById(id, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  }
);

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
app.use(require('flash')()); // here, because require session

// ROUTE FOR WEB MVC
app.use('/', indexRouter);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
/**
 * Notice that these middlewares are initialized after the `express-session` middleware.  This is because
 * Passport relies on the `express-session` middleware and must have access to the `req.session` object.
 * 
 * passport.initialize() - This creates middleware that runs before every HTTP request.  It works in two steps: 
 *      1. Checks to see if the current session has a `req.session.passport` object on it.  This object will be
 *          
 *          { user: '<Mongo DB user ID>' }
 * 
 *      2.  If it finds a session with a `req.session.passport` property, it grabs the User ID and saves it to an 
 *          internal Passport method for later.
 *  
 * passport.session() - This calls the Passport Authenticator using the "Session Strategy".  Here are the basic
 * steps that this method takes:
 *      1.  Takes the MongoDB user ID obtained from the `passport.initialize()` method (run directly before) and passes
 *          it to the `passport.deserializeUser()` function (defined above in this module).  The `passport.deserializeUser()`
 *          function will look up the User by the given ID in the database and return it.
 *      2.  If the `passport.deserializeUser()` returns a user object, this user object is assigned to the `req.user` property
 *          and can be accessed within the route.  If no user is returned, nothing happens and `next()` is called.
 */
app.use(passport.initialize());
app.use(passport.session());

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
