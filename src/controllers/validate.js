import { body } from 'express-validator';

export function validate(methodName) {
  switch(methodName) {
    case 'postRegister': {
      return [
        body('firstName').notEmpty().withMessage('Tên không được bỏ trống'),
        body('lastName').exists().withMessage('Họ và tên lót yêu cầu'),
        body('email').isEmail().withMessage('Địa chỉ hộp thư chưa hợp lệ'),
        body('username').isLength({min: 6}).withMessage('Tên đăng nhập từ 6 ký tự trở lên'),
        body('password').isLength({min: 8}).withMessage('Mật khẩu ít nhất 8 ký tự'),
        body('repassword').custom((value, { req }) => {
          if (value !== req.body.password) {
            // throw new Error('Password confirmation does not match password');
            return false;
          }
          return true;
        }).withMessage('Mật khẩu ít nhất 8 ký tự, nhập lại phải giống nhau'),
        
        body('major', 'Ngành học cần cung cấp').notEmpty(),
        body('phone', 'Số điện thoại là các ký số').isInt(),
        body('description', 'Yêu cầu phải mô tả thông tin cá nhân').notEmpty
      ]
    }
  }
}
export function errFormatter({ location, msg, param }) {
  return {message: msg};
}