import {BaseUser as User} from '../models';
import { genPassword } from '../security/processPassword'
const Recaptcha = require('express-recaptcha').RecaptchaV3;
const recaptcha = new Recaptcha(
  process.env.SITE_KEY, 
  process.env.SECRET_KEY, {callback: 'cb', action: 'homepage'}); // default action is homepage

export function showSignUpUi(req, res) {
  res.render('user/register');
}

export function showSignInUi(req, res) {
  // let cntFailed = !req.session.countFailed ? 0 : req.session.countFailed;
  // console.log('TIMEs FAIL-ED: ' + cntFailed)
  // if(cntFailed > 1) {
  //   res.render('user/login', { captcha: recaptcha.render()});  
  // } else {
  //   res.render('user/login');
  // }
  res.render('user/login', { captcha: recaptcha.render()});
}

export function showUsersDetailUi(req, res) {
  res.send('Show users detail ui'); // design ui for manage user
}

export async function postRegister(req, res) {
  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    email: req.body.email,
    username: req.body.username,
    hash: hash,
    salt: salt
  });
  await newUser.save((err) => {
    if(err) {
      // console.log(err);
      req.flash('warning', err.message);
      return res.redirect('/user/register');
    }
    req.flash('success', 'Register success!');
    return res.redirect('/user/login');
  });
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