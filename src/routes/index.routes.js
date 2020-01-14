import { Router } from 'express';
const router = Router();
import allApi from './api/v1';

// Use /api for RestAPI service for handheld device, frontend js app
router.use('/api', allApi);
//router.get('/', userController.showUi);

// Use controller for web app from browsers by import Controller from /controllers
// get Login form
router.get('/login', function(req, res, next) {
  res.render('authenticate/login');
});

export default router;