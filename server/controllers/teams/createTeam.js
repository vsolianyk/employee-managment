const _ = require('lodash');
const TeamModel = require('../../models/team');
const ProfileModel = require('../../models/profile');

const { getApiError } = require('../../utils/apiError');

module.exports = async (req, res) => {
  try {
    const newTeamModel = new TeamModel(req.body);
    const newTeam = await newTeamModel.save();
    console.log(newTeam)
    await ProfileModel.updateMany({ _id: { $in: newTeam.users} }, { $addToSet: { 'teams': newTeam._id } });
    res.send(newTeam);
  } catch (err) {
    const error = getApiError(err);
    const status = error.status || 500;
    return res.status(status).send(_.omit(error, ['status']));
  }
}

