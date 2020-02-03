function getHomePage(req, res) {
  let username = (!req.user || req.user==='undefined') ? null : req.user.username;
  res.render('homepage', { title: 'Knowledge review system', username: username});
}

export {
  getHomePage
}