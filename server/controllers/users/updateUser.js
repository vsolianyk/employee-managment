const _ = require('lodash');
const UserModel = require('../../models/user');
const ProfileModel = require('../../models/profile');

const { getApiError } = require('../../utils/apiError');

module.exports = async (req, res) => {
  try {
    const userData = _.pick(req.body, ['email', 'firstName', 'lastName', 'role', 'isActive'])
    const { email, role, isActive, ...profileData} = userData
    const user = await UserModel.findByIdAndUpdate(req.params.userId, { email, role, isActive }, { new: true });
    
    await ProfileModel.findOneAndUpdate({ userId: user._id}, profileData, { new: true });

    res.send({ id: user._id });
  } catch (err) {
    const error = getApiError(err);
    const status = error.status || 500;
    return res.status(status).send(_.omit(error, ['status']));
  }
}

