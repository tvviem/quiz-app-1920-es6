import { Router } from 'express';
const router = Router();
import  * as userController from '../controllers/user.controller';
import passport from 'passport';

router.get('/register', userController.showSignUpUi);
router.post('/register', userController.postRegister);
router.get('/login', userController.showSignInUi);
router.post('/login', passport.authenticate('local',
  { 
    successRedirect: '/check-role-to-forward-ui', // warning 2 times to check role
    failureRedirect: '/users/login',
    badRequestMessage: 'Vui lòng điền thông tin', // default = Missing credentials
    failureFlash: true
  })
);

// Route for guide, 

export default router;