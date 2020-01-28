import BaseRepo from  './base.repo';

import UserService from '../services/user.services';
import {BaseUser as User} from '../models';

const userService = new UserService(User);

class UserRepo extends BaseRepo {
  constructor(service) {
    super(service)
  }
}

export default new UserRepo(userService);