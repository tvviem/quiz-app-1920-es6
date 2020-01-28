//import Question from './business/question';
//import {Admin, Lecturer, Student} from './business/user';
// import {StudentRole, LecturerRole, AdminRole} from './business/role'
// import Admin from './business/admin';
// import Lecturer from './business/lecturer';
// import Student from './business/student';
// const models = {StudentRole, LecturerRole, AdminRole, Admin, Lecturer, Student};

import { userSchema } from './business/users/baseUserSchema';
import dbcon1 from '../database/dbconnect';

const BaseUser = dbcon1.model('User', userSchema); // utilize certain connect for a Model
export {
  BaseUser
};