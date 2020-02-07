import {BaseUser as User} from '../models';
import { genPassword } from '../security/processPassword';
const saltHash = genPassword('Password@123');
const salt = saltHash.salt;
const hash = saltHash.hash;
const firstUserAsAdmin = new User({
  firstName: 'Dubfire',
  lastName: 'Trieu',
  email: 'bluitdev@gmail.com',
  username: 'dubfire',
  role: 'admin',
  hash: hash,
  salt: salt,
  isActive: true,
  iconString: 'fas fa-users-cog'
});
User.create(firstUserAsAdmin, function(err) {
  if(err)
    console.log('Loi tao firstUser: ' + err);
});