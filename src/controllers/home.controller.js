function getHomePage(req, res) {
  res.render('homepage', {title: 'Knowledge review system'});
}

export {
  getHomePage
}