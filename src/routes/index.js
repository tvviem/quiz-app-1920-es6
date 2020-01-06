import { Router } from 'express';
const router = Router();
import userRoute from './user.routes';

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('homepage/index');
});
// get Login form
router.get('/login', function(req, res, next) {
  res.render('authenticate/login');
});

export default router;