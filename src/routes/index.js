import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('homepage/index');
});
// get Login form
router.get('/login', function(req, res, next) {
  res.render('authenticate/login');
});

export default router;