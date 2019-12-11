import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: {type: String, trim: true, default: ''},
  lastName: {type: String, trim: true, default: ''},
  gender: { type: String, default: 'not type'},
  email: String,
  stucode: String,
  password: String,
  google : {
    id : String,
    email: String, 
    token: String, // for OAuth
    name: String, 
  }, 
  last_login_at: Date, 
  created_at : {
    type: Date, 
    default: Date.now
  } 
});

export default model('User', userSchema);
