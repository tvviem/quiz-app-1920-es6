import { Router } from 'express';
const router = Router();
import allApi from './api/v1';
import {getHomePage} from '../controllers/home.controller';
import  * as userController from '../controllers/user.controller';

// Use /api for RestAPI service for handheld device, frontend js app
router.use('/api', allApi);
//router.get('/', userController.showUi);

// MVC tradition
router.get(['/', '/homepage'], getHomePage);
router.get('/users/list', userController.get_ui_manage_user);

// get Login form
router.get('/login', function(req, res, next) {
  res.render('authenticate/login');
});

export default router;