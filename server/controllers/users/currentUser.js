const _ = require('lodash');
const ObjectId = require('mongodb').ObjectID;

const ProfileModel = require('../../models/profile');
const { getApiError } = require('../../utils/apiError');

module.exports = async (req, res) => {
  try {
    const profile = await ProfileModel
      .findOne({ userId: ObjectId(req.user._id) })
      .populate('teams', 'name');

    res.send({ ...profile.toObject(), role: req.user.role });
  } catch (err) {
    const error = getApiError(err);
    const status = error.status || 500;
    return res.status(status).send(_.omit(error, ['status']));
  }
}

