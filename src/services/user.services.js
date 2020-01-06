import BaseUser from '../models/business/users/baseUserSchema';
import Admin from '../models/business/users/admin';
import Lecturer from '../models/business/users/lecturer';
import Student from '../models/business/users/student';

import conn from '../database/dbconnect';

export async function checkExistsRoot() {
  conn.once('open', () => {
    conn.db.listCollections({name: 'users'})
      .next((err, collect) => {
        if (collect) {
          console.log(collect);
          return true;
        } else {
          console.log(err);
        }
        return false;
    });
  }).then(() => {
    conn.close();
  });
}
export async function createStudent(student) {
  try {
    // phan giai thong tin sinh vien
    // await them thong tin sinh vien
  } catch (error) {
    
  }
}
// export {checkExistsRoot}
/* exports.createUser = async function (user, role) {
  try {
    
    //return await createUserWithRole(user, role)
  } catch(e) {
    throw new Error(e.message)
  }
} */
