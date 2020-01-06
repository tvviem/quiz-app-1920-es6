import * as userService from '../services/user.services';

export async function checkExistsRootToCreateFirstUser(req, res, next) {
  // Validate request parameters, queries using express-validator
  userService.checkExistsRoot();
}