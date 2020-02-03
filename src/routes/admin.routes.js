import { Router } from 'express';
const router = Router();
import  * as adminController from '../controllers/admin.controller';
import passport from 'passport';

// router.get('/dashboard', adminController.showDashboard);
/* router.post('/register', userController.postRegister);
router.get('/login', userController.showSignInUi);
router.post('/login', passport.authenticate('local',
  { 
    successRedirect: '/check-role-to-forward-ui',
    failureRedirect: '/users/login',
    failureFlash: true
  })
); */

export default router;