export function showDashboard(req, res) {
  res.render('admin/dashboard', { username: req.user.username });
}