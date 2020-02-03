import {BaseUser as User} from '../models';
import { genPassword } from '../security/processPassword'

export function showSignUpUi(req, res) {
  res.render('user/register');
}

export function showSignInUi(req, res) {
  res.render('user/login');
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