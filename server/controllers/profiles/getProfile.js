const _ = require('lodash');
const ObjectId = require('mongodb').ObjectID;

const { getApiError } = require('../../utils/apiError');

const ProfileModel = require('../../models/profile');

module.exports = async (req, res) => {
  try {
    const profile = await ProfileModel
      .findOne({ _id: ObjectId(req.params.id) })
      .populate('teams', 'name description');
    
    if (!profile) {
      throw new Error({name: 'NotFound', message: 'User not found'});
    }

    res.send({ ...profile.toObject() });
  } catch (err) {
    const error = getApiError(err);
    const status = error.status || 500;
    return res.status(status).send(_.omit(error, ['status']));
  }
}