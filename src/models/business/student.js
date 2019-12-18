import { Schema, model } from 'mongoose';

const BaseUser = require('./baseUserSchema');

const Student = BaseUser.default.discriminators('Student', new Schema({
  studentCode: {type: String, required: [true, 'identify of each students']},
  className: {type: String, required: [true, 'where studying of students']},
}));

export default Student;
