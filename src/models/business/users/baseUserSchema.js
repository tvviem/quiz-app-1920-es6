import { Schema, model } from 'mongoose';
// const bcrypt = require('bcryptjs');

const baseOptions = {
  discriminatorKey: 'itemType', // our discriminator key, could be anything. when create Student itemType auto equal Student
  collection: 'users', // the name of our collection
  timestamps: true
};

// Our Base schema: these properties will be shared with our "real" schemas
const userSchema = new Schema({
  firstName: {type: String, trim: true, default: 'unset'},
  lastName: {type: String, trim: true, default: 'unset'},
  gender: { type: String, default: 'undefined'},
  email: {
    type: String, 
    lowercase: true, minlength: 1, trim: true,
    required: [true, 'can not be blank'], match: [/\S+@\S+\.\S+/, 'Email is invalid'], 
    index: true, unique: true
  },
  username: {
    type: String,
    lowercase: true, minlength: 6, trim: true,
    required: [true, 'can not be blank'], 
    match: [/^[a-zA-Z0-9]+$/, 'Username is invalid'], 
    index: true, unique: true
  },
  //password: {type: String, required: [true, 'can not be blank']},
  hash: {type: String, required: [true, 'Hash can not be blank']},
  salt: {type: String, required: [true, 'Salt can not be blank']},
  //created_at: {type: Date, default: Date.now},
  role: { type: String, enum: ['student', 'lecturer', 'admin'], default: 'student'},
  iconString: {type: String, default: 'fas fa-user'} // chalkboard-teacher, users-cog
}, baseOptions)

/* userSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) {
    return next();
  }
  //we generate the salt using 12 rounds and then use that salt with the received password string to generate our hash
  bcrypt
    .genSalt(12)
    .then((salt) => {
      return bcrypt.hash(user.password, salt);
    })
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((err) => next(err));
}); */

const BaseUser = model('User', userSchema);
export { BaseUser };