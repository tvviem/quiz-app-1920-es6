import { userSchema } from './business/UserSchema';
import dbcon1 from '../database/dbconnect';
// import dbcon2 from 'where_connect_to_store_other_collection';

const BaseUser = dbcon1.model('User', userSchema); // utilize certain connect for a Model
// const NewModel = dbcon2.model('Post', newSchema, 'Posts'); // Posts is collection name
export {
  BaseUser
};