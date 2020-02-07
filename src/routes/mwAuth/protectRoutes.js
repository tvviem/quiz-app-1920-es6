// Co the bo sung check Role de chuyen ve giao dien tuong ung
export function checkAuthenticated(req, res, next) {
  // console.log('INSIDE checkAuthenticated: ' + req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/user/login');
}

export function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/user/dashboard');
  }
  next();
}

// Show captcha when countFailed>1
export function sendCaptchaToClient(req, res, next) {
  // let cntFailed = req.session.countFailed;
  // if(!isNaN(cntFailed) && cntFailed > 1) {
  //   res.
  // }
  // next();
}

export function checkAdminRole(req, res, next) {
  if (req.user.role == 'admin') {
    return next();
  }
  res.status(403).render('error', { message: 'YÊU CẦU LOẠI NGƯỜI DÙNG PHÙ HỢP'});
}
export function checkLecturerRole(req, res, next) {
  if (req.user.role == 'lecturer') {
    return next();
  }
  res.status(403).render('error', { message: 'YÊU CẦU LOẠI NGƯỜI DÙNG PHÙ HỢP' });
}
export function checkStudentRole(req, res, next) {
  if (req.user.role == 'student') {
    return next();
  }
  res.status(403).render('error', { message: 'YÊU CẦU LOẠI NGƯỜI DÙNG PHÙ HỢP' });
}