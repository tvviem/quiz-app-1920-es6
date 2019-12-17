import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
  firstName: {type: String, trim: true, default: 'unset'},
  lastName: {type: String, trim: true, default: 'unset'},
  gender: { type: String, default: 'undefined'},
  email: {type: String, lowercase: true, required: [true, 'can not be blank'], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  username: {type: String, lowercase: true, required: [true, 'can not be blank'], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  password: {type: String, required: [true, 'can not be blank']},
  last_login_at: {type: Date, default: Date.now},
  image: String,
  class: {type: String}
}, {timestamps: true});
const Student = model('Student', studentSchema);
export default Student;
