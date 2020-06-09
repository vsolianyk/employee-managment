const googleUtil = require('../../utils/google-auth');

module.exports = (req, res) => {
  const url = googleUtil.getGoogleUrl();
  res.redirect(url)
}