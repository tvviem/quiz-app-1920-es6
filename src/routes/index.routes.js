import { Router } from 'express';
const router = Router();
import allApi from './api/v1';
import { getHomePage } from '../controllers/home.controller';
import userRoutes from './user.routes'
import adminRoutes from './admin.routes'
import { checkAuthenticated, checkAdminRole } from './mwAuth/protectRoutes';

// Use /api for RestAPI service for handheld device, frontend js app
router.use('/api/v1', allApi);

// MVC tradition
router.get(['/', '/index.php'], getHomePage);
// Route for general users
router.use('/user', userRoutes);
// All routes for user within admin.routes.js
router.use('/admin', checkAuthenticated, checkAdminRole, adminRoutes); // can them check role

export default router;