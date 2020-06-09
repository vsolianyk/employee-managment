const _ = require('lodash');
const UserModel = require('../../models/user');
const ProfileModel = require('../../models/profile');

const { getApiError } = require('../../utils/apiError');

module.exports = async (req, res) => {
  try {
    const team = await UserModel.findByIdAndRemove(req.params.userId);
    if (!team) {
      throw new Error({name: 'NotFound', message: 'User not found'});
    }

    await ProfileModel.findOneAndRemove({'userId': req.params.userId})
    res.status(200).send();
  } catch (err) {
    const error = getApiError(err);
    const status = error.status || 500;
    return res.status(status).send(_.omit(error, ['status']));
  }
}