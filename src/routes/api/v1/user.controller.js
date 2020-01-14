import Controller from  './base.controller';

import UserService from '../../../services/user.service';
import {BaseUser as User} from '../../../models/business/users/baseUserSchema';
const userService = new UserService(User);

class UserController extends Controller {
  constructor(service) {
    super(service)
  }
}

export default new UserController(userService);