import { BaseUser as User } from '../models/business/users/baseUserSchema';
import { genPassword } from '../utils/processPassword'
function showSignUpUi(req, res) {
  res.render('users/register');
}

function showSignInUi(req, res) {
  res.render('users/login');
}

function showUsersDetailUi(req, res) {
  res.send('Show users detail ui'); // design ui for manage user
};
function postRegister(req, res, next) {
  console.log(req.body);

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
  console.log(newUser); // OKE
  // BUT have not save ? Why

  newUser.save().then((user) => {
    console.log(user);
    res.redirect('/users/login');
  }).catch((err) => {
    req.flash('error', 'Error create user');
    next();
  });
}
export {
  showUsersDetailUi,
  showSignInUi,
  showSignUpUi,
  postRegister
};