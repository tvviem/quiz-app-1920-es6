import { Schema } from 'mongoose';

const BaseUser = require('./baseUserSchema');

const Lecturer = BaseUser.default.discriminator('Lecturer', new Schema({
  department: {type: String, required: [true, 'where working of lecturers']},
  specialized: {type: String, required: [true, 'what specialized of lecturers']},
  numberOfQuestions: {type: Number, default: 0},
  numberOfSetQuestions: {type: Number, default: 0},
  numberStudentsCreated: {type: Number, default: 0} // lecturers can create student accounts
}));

export default Lecturer;
