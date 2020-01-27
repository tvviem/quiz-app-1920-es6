import { Router } from 'express';
const router = Router();
import allApi from './api/v1';
import { getHomePage } from '../controllers/home.controller';
import usersRoute from './user.routes'

// Use /api for RestAPI service for handheld device, frontend js app
router.use('/api', allApi);

// MVC tradition
router.get(['/', '/index.php'], getHomePage);
// Route for /users
router.use('/users', usersRoute);

export default router;