import { BaseUser as User } from '../models/business/users/baseUserSchema';
import { genPassword } from '../security/processPassword'
import UserService from '../services/user.services';

export function showSignUpUi(req, res) {
  res.render('users/register');
}

export function showSignInUi(req, res) {
  res.render('users/login');
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
      return res.redirect('/users/register');
    }
    req.flash('success', 'Register success!');
    return res.redirect('/users/login');
  });
}