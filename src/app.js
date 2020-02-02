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
import { BaseUser as UserModel } from './models';

// import { BaseUser } from './models/business/users/baseUserSchema';
// IMPORT ALL ROUTE HERE: route MVC and RestAPI
import indexRouter from './routes/index.routes';

mongoCon.once('open', () => {
  UserModel.countDocuments((err, value) => {
    if(!err && value==0) {
      require('./database/seeder');
    }
  });
});

var app = express();
// Config session and passport
const sessionStore = new MongoStore({ 
  mongooseConnection: mongoCon, 
  touchAfter: 24 * 3600, // lazy update session, the session be updated only one time in a period of 24 hours,
  collection: 'sessions', 
  ttl: (60*60*1) // 1 hour (seconds is unit, default value 14 days)
});
const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    //secure: true,
    httpOnly: true, // phia client khong the truy xuat cookie voi lenh document.cookie
    maxAge: 1000 * 60 * 60, // 60 mins (miliseconds is default unit, maxAge default null ),
  },
  name: 'qidsess'
}
if(process.env.NODE_ENV == 'production') { // for deploy app with https 
  app.set('trust proxy', 1) // trust first proxy
  sessionOptions.cookie.secure = true // serve secure cookies
}
//const sessionPaths = ['/users/login', '/users/register', '/'];
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

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
  src: join(__dirname, '../scss'),
  dest: join(__dirname, '../public'),
  indentedSyntax: false, // true = .sass and false = .scss
  //sourceMap: true,
  outputStyle: 'compressed',
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

// redundant code, cause recheck 2 times role of user
app.get('/check-role-to-forward-ui', (req, res, next) => {
  if(req.user.role == 'admin')
    res.render('admin/dashboard', {username: req.user.username});
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
  res.render('error');
});

export default app;