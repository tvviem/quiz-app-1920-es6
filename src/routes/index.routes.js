import { Router } from 'express';
const router = Router();
import allApi from './api/v1';
import { getHomePage } from '../controllers/home.controller';
import  * as userController from '../controllers/user.controller';

// Use /api for RestAPI service for handheld device, frontend js app
router.use('/api', allApi);

// MVC tradition
router.get(['/', '/index.php'], getHomePage);
router.get('/users/register', userController.showSignUpUi);
router.post('/users/register', userController.postRegister);
router.get('/users/login', userController.showSignInUi);

router.get('/users/list', userController.showUsersDetailUi);

export default router;