import { Schema } from 'mongoose';
import {BaseUser} from '../../index';
// const BaseUser = require('./baseUserSchema').BaseUser;
const Admin = BaseUser.discriminator('Admin', new Schema({
  isRoot: {type: Boolean, default: false}, // possible multi admin, but only one root
  numberLecturersCreated: {type: Number, default: 0}
}));

export {Admin};
