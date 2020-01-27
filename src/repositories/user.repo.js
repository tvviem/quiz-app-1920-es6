import BaseRepo from  './base.repo';

import UserService from '../services/user.services';
import {BaseUser as User} from '../models/business/users/baseUserSchema';
const userService = new UserService(User);

class UserRepo extends BaseRepo {
  constructor(service) {
    super(service)
  }
}

export default new UserRepo(userService);