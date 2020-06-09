const _ = require('lodash');

const TeamModel = require('../../models/team');
const ProfileModel = require('../../models/profile');

const { getApiError } = require('../../utils/apiError');

module.exports = async (req, res) => {
  try {

    const oldTeam = await TeamModel.findById(req.params.teamId);

    if (!oldTeam) {
      throw new Error({name: 'NotFound', message: 'Team not found'});
    }

    const teamData = _.pick(req.body, ['name', 'description', 'users', 'manager', 'teamLead', 'parent']);

    const team = await TeamModel.findByIdAndUpdate(req.params.teamId, teamData, { new: true });
    //TODO: should be better way probably
    if (teamData.users && team.users.join() !== oldTeam.users.join()) {
      await ProfileModel.updateMany({ _id: { $in: oldTeam.users} }, { $pull: { 'teams': team._id } });
      await ProfileModel.updateMany({ _id: { $in: team.users} }, { $addToSet: { 'teams': team._id } });
    }

    res.send({ ...team.toObject() });
  } catch (err) {
    const error = getApiError(err);
    const status = error.status || 500;
    return res.status(status).send(_.omit(error, ['status']));
  }
}