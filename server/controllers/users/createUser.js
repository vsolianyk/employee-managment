const _ = require('lodash');
const UserModel = require('../../models/user');
const ProfileModel = require('../../models/profile');

const { getApiError } = require('../../utils/apiError');

module.exports = async (req, res) => {
  try {
    const userData = _.pick(req.body, ['email', 'firstName', 'lastName', 'role', 'isActive'])
    const { email, role, isActive, ...profileData} = userData
    const userModel = new UserModel({ email, role, isActive });

    const user = await userModel.save();

    const profileModel = new ProfileModel({ userId: user._id, ...profileData, email });
    await profileModel.save();

    res.send({ id: user._id });
  } catch (err) {
    const error = getApiError(err, 'User');
    const status = error.status || 500;
    return res.status(status).send(_.omit(error, ['status']));
  }
}

