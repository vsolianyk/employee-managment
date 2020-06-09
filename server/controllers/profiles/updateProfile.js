const _ = require('lodash');
const ObjectId = require('mongodb').ObjectID;

const ProfileModel = require('../../models/profile');
const { getApiError } = require('../../utils/apiError');

const updateMap = {
  jobInfo: [
    'hireDate',
    'timeOffStartDate',
    'title',
    'office',
  ],
  personalInfo: [
    'avatarUrl',
    'birthDate',
    'isMarried',
    'gender',
    'summary',
    'country',
    'state',
    'city',
    'street',
    'zip',
    'phone',
    'skype',
    'skills',
  ]
}

module.exports = (partForUpdate) => async (req, res) => {
  try {
    const fieldsForUpdate = updateMap[partForUpdate];
    if (!fieldsForUpdate) {
      throw new Error({message: 'Incorrect mapping'});
    }
    const profileData = _.pick(req.body, fieldsForUpdate);
    const profile = await ProfileModel.findOneAndUpdate({ _id: ObjectId(req.params.id)}, profileData, { new: true });

    if (!profile) {
      throw new Error({name: 'NotFound', message: 'User not found'});
    }

    res.send(profile);
  } catch (err) {
    const error = getApiError(err);
    const status = error.status || 500;
    return res.status(status).send(_.omit(error, ['status']));
  }
}
