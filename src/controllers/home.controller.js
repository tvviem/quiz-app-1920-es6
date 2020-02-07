function getHomePage(req, res) {
  //let username = (!req.user || req.user==='undefined') ? null : req.user.username;
  res.render('homepage');
}

export {
  getHomePage
}