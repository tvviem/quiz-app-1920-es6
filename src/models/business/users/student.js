import { Schema } from 'mongoose';

const BaseUser = require('./baseUserSchema');

const Student = BaseUser.default.discriminator('Student', new Schema({
  studentCode: {type: String, required: [true, 'identify of each students']},
  className: {type: String, required: [true, 'where studying of students']},
  numbersAnswerRight: {type: Number, default: 0},
  numbersAnswerWrong: {type: Number, default: 0}
}));

export default Student;
