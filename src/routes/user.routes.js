import { Router } from 'express';
const router = new Router();
import * as UserController from '../controllers/user.controller';

router.get('/', UserController.checkExistsRootToCreateFirstUser)