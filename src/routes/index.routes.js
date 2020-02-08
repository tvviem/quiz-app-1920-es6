import { Router } from 'express';
const router = Router();
import allApi from './api/v1';
import { getHomePage } from '../controllers/home.controller';
import userRoutes from './user.routes'
import adminRoutes from './admin.routes'
import { checkAuthenticated, checkAdminRole } from './mwAuth/protectRoutes';
import cors from 'cors';

// Use /api for RestAPI service for handheld device, frontend js app
var whitelist = ['http://localhost:4000', 'http://localhost:5000'];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) { // !origin for postman test and server-to-server
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
router.use('/api/v1', cors(corsOptions), allApi); // THICK-client

// MVC tradition for THICK-server
router.get(['/', '/index.php'], getHomePage);
// Route for general users
router.use('/user', userRoutes);
// All routes for user within admin.routes.js
router.use('/admin', checkAuthenticated, checkAdminRole, adminRoutes); // can them check role

export default router;