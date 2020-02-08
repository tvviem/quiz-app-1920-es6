import {validPassword} from './processPassword';
import { Strategy as LocalStrategy } from 'passport-local';
import {BaseUser} from '../models';
// const request = require('request');
import request from 'request';

// Config session-based with passport-local
export function initialize(passport) {
  const authenticateUser = async (req, username, password, done) => {
    // Use RecaptchaV3 google
    if(!req.body.tokenCaptcha)
      return done(null, false, {type: 'warning', message: 'No tokenCaptcha sended'});
    else { // verify captcha
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${req.body.tokenCaptcha}`;
      request(verifyUrl, (err, response, body) => {
        if(err) { console.log(err); }
        body = JSON.parse(body); // get info captcha from Google
        if(!body.success && body.success === undefined){
          return done(null, false, {type: 'warning', message: 'Captcha verification failed'}); //res.json({"success":false, "msg":"captcha verification failed"});
        }
        if(body.score < 0.5){
          return done(null, false, {type: 'warning', message: 'You might be a bot, WARNING'}); // res.json({"success":false, "msg":"you might be a bot, sorry!", "score": body.score});
        }
        // return json message or continue with your function. Example: loading new page, ect
        //console.log('success: ' + body.success + ', with score: ' + body.score)
        //return res.json({"success":true, "msg":"captcha verification passed", "score": body.score});
      });
    }
    // Search user info
    const user = await BaseUser.findOne({ username: username }, (error, doc) => {
      if(!error) return doc;
      else console.log('LOI TIM KIEM USER KHI CHUNG THUC');
    });  
    if(user === null) {
      return done(null, false, {type: 'warning', message: `No user with name ${username}`});
    }
    try {
      if (validPassword(password, user.hash, user.salt)) {
        return done(null, user); // SUCCESS INFO
      } else {
        return done(null, false, {type: 'warning', message: 'Incorrect password!'});
      }
    } catch (error) {
      return done(error);
    }
  }
  // when use email is identify user.
  // passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'passwd'}, authenticateUser));
  passport.use(new LocalStrategy({ passReqToCallback: true }, authenticateUser)); // use req inside authenticateUser method
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((_id, done) => {
    BaseUser.findById(_id, (err, userDoc) => {
      if (err) 
        return done(err);
      done(null, userDoc); // return and set req.user = user_found in db
    });
  });
}
// A other config for passport with JWT authentication
/* export function initPassportForJWT(passport) {

} */