import {BaseUser as User} from '../models';
import { genPassword } from '../security/processPassword'
import { validationResult } from 'express-validator';
import { errFormatter } from './validate';
const Recaptcha = require('express-recaptcha').RecaptchaV3;
const recaptcha = new Recaptcha(
  process.env.SITE_KEY, 
  process.env.SECRET_KEY, {callback: 'cb', action: 'homepage'}); // default action is homepage

export function showSignUpUi(req, res) {
  res.render('user/register');
}

export function showSignInUi(req, res) {
  res.render('user/login', { captcha: recaptcha.render()});
}

export function showUsersDetailUi(req, res) {
  res.send('Show users detail ui'); // design ui for manage user
}
export async function postRegister(req, res, next) {
  try {
    const allErrObj = validationResult(req).formatWith(errFormatter);
    if(!allErrObj.isEmpty()) {
      req.flash('warning', allErrObj.array());
      return res.render('user/register', {user: req.body});
    }

    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      email: req.body.email,
      major: req.body.major,
      description: req.body.description,
      username: req.body.username,
      hash: hash,
      salt: salt,
      phone: req.body.phone
    });
    await newUser.save((err) => {
      if(err) {
        req.flash('warning', err.message);
        return res.redirect('/user/register');
      }
      req.flash('success', 'Người dùng đã được đăng ký');
      return res.redirect('/user/login');
    });
  } catch (error) {
    return next(error);
  }

}
export function choiceBoard(req, res) {
  if(req.user.role == 'admin')
    res.render('admin/dashboard', { username: req.user.username });
  else if(req.user.role == 'lecturer')
    res.render('lecturer/dashboard', {username: req.user.username});
  else if(req.user.role == 'student')
    res.render('student/dashboard', {username: req.user.username});
  else 
    res.render('error', {message: 'Truy cập không hợp lệ!'});
}