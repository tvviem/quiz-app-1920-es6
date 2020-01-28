import { Router } from 'express';
const router = Router();
import  * as userController from '../controllers/user.controller';
import passport from 'passport';

router.get('/register', userController.showSignUpUi);
router.post('/register', userController.postRegister);
router.get('/login', userController.showSignInUi);
router.post('/login', passport.authenticate('local',
  { 
    successRedirect: '/login-success',
    failureRedirect: '/login-failure',
    failureFlash: true 
  }));
    
  // }), 
  // (err, req, res, next) => {
  //   if (err) next(err);
  // }
router.get('/list', userController.showUsersDetailUi);

export default router;