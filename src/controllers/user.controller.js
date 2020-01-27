import { BaseUser as User } from '../models/business/users/baseUserSchema';
import { genPassword } from '../utils/processPassword'
import UserService from '../services/user.services';

function showSignUpUi(req, res) {
  res.render('users/register');
}

function showSignInUi(req, res) {
  res.render('users/login');
}

function showUsersDetailUi(req, res) {
  res.send('Show users detail ui'); // design ui for manage user
};
function postRegister(req, res) {
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
  newUser.save((err) => {
    if(err) {
      // console.log(err);
      req.flash('warning', err.message);
      return res.redirect('/users/register');
    }
    req.flash('success', 'Register success!');
    return res.redirect('/users/login');
  });
}
export {
  showUsersDetailUi,
  showSignInUi,
  showSignUpUi,
  postRegister
};