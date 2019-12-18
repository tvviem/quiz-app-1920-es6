import { Schema, model } from 'mongoose';

const baseOptions = {
  discriminatorKey: 'itemType', // our discriminator key, could be anything. when create Student itemType auto equal Student
  collection: 'users', // the name of our collection
  timestamps: true
};

// Our Base schema: these properties will be shared with our "real" schemas
const BaseUser = model('User', new Schema({
      firstName: {type: String, trim: true, default: 'unset'},
      lastName: {type: String, trim: true, default: 'unset'},
      gender: { type: String, default: 'undefined'},
      email: {type: String, lowercase: true, required: [true, 'can not be blank'], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true, unique: true},
      username: {type: String, lowercase: true, required: [true, 'can not be blank'], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true, unique: true},
      password: {type: String, required: [true, 'can not be blank']},
      created_at: {type: Date, default: Date.now},
      role: {type: Schema.Types.ObjectId, ref: 'Role'},
      image: {type: String}
    }, baseOptions,
  )
);

export default BaseUser;