import { Router } from 'express';
const router = Router();
import  * as userController from '../controllers/user.controller';

router.get('/register', userController.showSignUpUi);
router.post('/register', userController.postRegister);
router.get('/login', userController.showSignInUi);

router.get('/list', userController.showUsersDetailUi);

export default router;