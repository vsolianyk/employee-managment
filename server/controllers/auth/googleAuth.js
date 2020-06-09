const googleUtil = require('../../utils/google-auth');

const UserModel = require('../../models/user');
const ProfileModel = require('../../models/profile');

const { setAuthCookie } = require('../../utils/auth');

module.exports = async (req, res) => {
  try {
    const account = await googleUtil.getGoogleAccountFromCode(
      req.query.code || '',
    );
    const user = await UserModel.findOne({ email: account.email });
    if (!user) {
      return res.redirect('http://localhost:3000/error/forbidden');
    }
    await ProfileModel.findOneAndUpdate({ userId: user._id}, {avatarUrl: account.imageUrl})

    setAuthCookie(res, user._id);

    res.redirect('http://localhost:3000/');
  } catch (err) {
    res.redirect('http://localhost:3000/error/server');
  }
}