import { Schema, model } from 'mongoose';

const baseOptions = {
  discriminatorKey: 'itemType', // our discriminator key, could be anything. when create Student itemType auto equal Student
  collection: 'roles', // the name of our collection
};
const role = model('Role', new Schema({
  roleName: {type: String, trim: true, default: 'student'},
}, baseOptions));

const StudentRole = role.discriminator('StudentRole', new Schema({
  isPermitTest: {type: Boolean, default: true},
  isPermitExam: {type: Boolean, default: true},
  isPermitJoinCourse: {type: Boolean, default: true}
}));

const LecturerRole = role.discriminator('LecturerRole', new Schema({
  isPermitCrudQuestions: {type: Boolean, default: true},
  isPermitCreateDiscussion: {type: Boolean, default: true},
  isPermitCrudSetQuestions: {type: Boolean, default: true},
  isPermitCreateAnExam: {type: Boolean, default: true}
}));

const AdminRole = role.discriminator('AdminRole', new Schema({
  isPermitCrudUsers: {type: Boolean, default: true},
  isPermitActiveUser: {type: Boolean, default: true},
  isPermitDeactiveUser: {type: Boolean, default: true},
  isPermitViewLog: {type: Boolean, default: true}
}));
// const StudentR = model('StudentRole', StudentRole);

export {StudentRole, LecturerRole, AdminRole};