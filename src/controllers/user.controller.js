import {BaseUser as User} from '../models/business/users/baseUserSchema';

function showSignUpUi(req, res) {
  res.render('users/register');
}

function showSignInUi(req, res) {
  res.render('users/login');
}

function showUsersDetailUi(req, res) {
  res.send('Show users detail ui'); // design ui for manage user
};

export {
  showUsersDetailUi,
  showSignInUi,
  showSignUpUi
};