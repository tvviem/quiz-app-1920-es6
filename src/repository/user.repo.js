import {Admin} from '../models/business/users/admin';
import {Lecturer} from '../models/business/users/lecturer';
import {Student} from '../models/business/users/student';
import {BaseUser} from '../models/business/users/baseUserSchema';

export class UserRepository {
  constructor() {
    this.userAdmin = AdminModel;
    this.userLecturer = LecturerModel;
    this.userStudent = StudentModel;
  }
  async create(role, user) {
    try {
      if(role==='student') {
        this.userStudent.create(user);
      } else if(role==='lecturer') {
        this.userLecturer.create(user);
      } else if(role==='admin') {
        this.userAdmin.create(user);
      }
    } catch (error) {
      console.log('ERR: Inside create user repository')
    }
  }
  async getUserById(idUser) {
    BaseUser.findById(idUser, (err, res) => {
      if(!err) {
        return res;
      }
      console.log('ERR: FindUserById' + err);
    })
  }
}