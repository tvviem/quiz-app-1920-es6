import { Schema, model } from 'mongoose';

class UserSchema extends Schema {
  constructor(obj, options) {
    super(obj, options);
    this.add({
      firstName: {type: String, trim: true, default: 'unset'},
      lastName: {type: String, trim: true, default: 'unset'},
      gender: { type: String, default: 'undefined'},
      email: {type: String, lowercase: true, required: [true, 'can not be blank'], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true, unique: true},
      username: {type: String, lowercase: true, required: [true, 'can not be blank'], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true, unique: true},
      password: {type: String, required: [true, 'can not be blank']},
      //role: { type: String, enum: ['student', 'lecturer', 'admin'], required: true},
      created_at: {type: Date, default: Date.now},
      image: String
    });
  }
}
class AdminSchema extends UserSchema {
  constructor(obj, options) {
    super(obj, options);
    this.add({
      department: {type: String, default: 'CNTT', required: [true, 'where working of lecturer']},
      role: { type: String, enum: ['student', 'lecturer', 'admin'], required: true},
    });
  }
}

class LecturerSchema extends UserSchema {
  constructor(obj, options) {
    super(obj, options);
    this.add({
      department: {type: String, default: 'CNTT', required: [true, 'where working of lecturer']},
      isAdmin: {type: Boolean, default: false}
    });
    //this.role = 'lecturer';
  }
}

class StudentSchema extends UserSchema {
  constructor(obj, options) {
    super(obj, options);
    this.add({
      studentCode: {type: String, required: [true, 'identify of each students']},
      className: {type: String, required: [true, 'where studying of students']},
    });
    //obj.role = 'student';
  }
}
const schemaAdmin = new AdminSchema();
const schemaLecturer = new LecturerSchema();
const schemaStudent = new StudentSchema();

const Admin = model('Admin', schemaAdmin);
const Lecturer = model('Lecturer', schemaLecturer);
const Student = model('Student', schemaStudent);
export { Admin, Lecturer, Student };