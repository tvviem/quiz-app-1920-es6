import { Schema, model } from 'mongoose';

class userSchema extends Schema {
  constructor(obj, options) {
    super(obj, options);
    this.add({
      firstName: {type: String, trim: true, default: 'unset'},
      lastName: {type: String, trim: true, default: 'unset'},
      gender: { type: String, default: 'undefined'},
      email: {type: String, lowercase: true, required: [true, 'can not be blank'], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true, unique: true},
      username: {type: String, lowercase: true, required: [true, 'can not be blank'], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true, unique: true},
      password: {type: String, required: [true, 'can not be blank']},
      role: { type: String, enum: ['student', 'lecturer', 'admin']},
      created_at: {type: Date, default: Date.now},
      image: String
    });
  }
}
class adminSchema extends userSchema {
  constructor(obj, options) {
    super(obj, options);
    this.add({
      department: {type: String, default: 'CNTT', required: [true, 'where working of lecturer']},
    });
    this.role = 'admin';
  }
}

class lecturerSchema extends userSchema {
  constructor(obj, options) {
    super(obj, options);
    this.add({
      department: {type: String, default: 'CNTT', required: [true, 'where working of lecturer']},
    });
    this.role = 'lecturer';
  }
}

class studentSchema extends userSchema {
  constructor(obj, options) {
    super(obj, options);
    this.add({
      studentCode: {type: String, required: [true, 'identify of each students']},
      className: {type: String, required: [true, 'where studying of students']},
    });
    this.role = 'student';
  }
}
const schemaAdmin = new adminSchema();
const schemaLecturer = new lecturerSchema();
const schemaStudent = new studentSchema();

const Admin = model('Admin', schemaAdmin);
const Lecturer = model('Lecturer', schemaLecturer);
const Student = model('Student', schemaStudent);
export default {Admin, Lecturer, Student};