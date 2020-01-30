import BaseService from './base.service';

class UserService extends BaseService {
  constructor(model) {
    super(model);
  }
}
export default UserService;
/* exports.checkExistsRoot = () => {
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
} */