import { Schema } from 'mongoose';
// import conn from '../../../database/dbconnect';
// const bcrypt = require('bcryptjs');

const baseOptions = {
  discriminatorKey: 'itemType', // our discriminator key, could be anything. when create Student itemType auto equal Student
  collection: 'users', // the name of our collection
  timestamps: true
};

// Our Base schema: these properties will be shared with our "real" schemas
const userSchema = new Schema({
  firstName: {type: String, trim: true, required:[true, 'firstName not blank']},
  lastName: {type: String, trim: true, required:[true, 'lastName not blank']},
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
  hash: {type: String, required: [true, 'Hash can not be blank']},
  salt: {type: String, required: [true, 'Salt can not be blank']},
  role: { 
    type: String,
    enum: ['student', 'lecturer', 'admin'],
    default: 'student',
    required: [true, 'can not be blank']
  },
  isActive: {type: Boolean, default: false},
  major: {type: String, required: true},
  description: {type: String, required: [true, 'You have to describe you self']},
  iconString: {type: String, default: 'fas fa-user'} // chalkboard-teacher, users-cog
},baseOptions);
userSchema.methods.isAdmin=function() {
  return (this.role == 'admin');
}
userSchema.methods.isLecturer=function() {
  return (this.role == 'lecturer');
}
userSchema.methods.isStudent=function() {
  return (this.role == 'student');
}

export { userSchema };
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

// const BaseUser = conn.model('User', userSchema);
// export { BaseUser };