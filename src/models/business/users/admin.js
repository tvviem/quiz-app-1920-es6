import { Schema } from 'mongoose';

const BaseUser = require('./baseUserSchema');

const Admin = BaseUser.default.discriminator('Admin', new Schema({
  isRoot: {type: Boolean, default: false}, // possible multi admin, but only one root
  numberLecturersCreated: {type: Number, default: 0}
}));

export default Admin;
