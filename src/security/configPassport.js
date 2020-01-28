// const LocalStrategy = require('passport-local').Strategy;
import {validPassword} from './processPassword';
import { Strategy as LocalStrategy } from 'passport-local';
//import {BaseUser} from '../models/business/users/baseUserSchema';
import {BaseUser} from '../models';

export function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    console.log(username + "  " + password)
    const user = await BaseUser.findOne({ username: username }, (error, doc) => {
      if(!error) return doc;
      else console.log('LOI TIM KIEM USER KHI CHUNG THUC');
    });
    if(user == null) {
      return done(null, false, {message: 'No user with that username'});
    }
    try {
      if (validPassword(password, user.hash, user.salt)) {
        return done(null, user);
      } else {
        return done(null, false, {message: 'Incorrect password!'});
      }
    } catch (error) {
      return done(error);
    }
  }

  passport.use(new LocalStrategy(authenticateUser));
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((_id, done) => {
    BaseUser.findById(_id, (err, userDoc) => {
      if (err) 
        return done(err);
      done(null, userDoc);
    });
  });
}