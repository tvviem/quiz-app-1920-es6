import { Router } from 'express';
const router = Router();
import  * as userController from '../controllers/user.controller';
import passport from 'passport';
import {checkNotAuthenticated} from './mwAuth/protectRoutes';

router.get('/register', checkNotAuthenticated, userController.showSignUpUi);
router.post('/register', checkNotAuthenticated, userController.postRegister);
router.get('/login', checkNotAuthenticated, userController.showSignInUi);
router.post('/login', checkNotAuthenticated, passport.authenticate('local',
  { 
    successRedirect: '/user/dashboard', // redirect role-based
    failureRedirect: '/user/login',
    badRequestMessage: 'Vui lòng điền thông tin', // default = Missing credentials
    failureFlash: true
  })
);
router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.get('/dashboard', userController.choiceBoard);  // access /users/dashboard
// Route for guide, 

export default router;