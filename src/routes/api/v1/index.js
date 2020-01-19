import { Router } from 'express';
const router = Router();
import userApi from '../../../repositories/user.repo';

// domain.com/api/
// API for users
router.get('/users', userApi.getAll);
router.post('/users', userApi.insert);
router.get('/users/:id', userApi.get);

// API for questions
/* router.get('/questions', questionController.getAll);
router.post('/questions', questionController.insert);
router.get('/questions/:id', questionController.get);
router.delete('/questions/:id', questionController.delete); */

export default router;