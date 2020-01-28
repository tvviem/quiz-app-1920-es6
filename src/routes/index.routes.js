import { Router } from 'express';
const router = Router();
import allApi from './api/v1';
import { getHomePage } from '../controllers/home.controller';
import userRoutes from './user.routes'

// Use /api for RestAPI service for handheld device, frontend js app
router.use('/api/v1', allApi);

// MVC tradition
router.get(['/', '/index.php'], getHomePage);
// Route for /users
router.use('/users', userRoutes);

// Co the bo sung check Role de chuyen ve giao dien tuong ung
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login');
}
export default router;