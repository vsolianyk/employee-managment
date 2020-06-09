const _ = require('lodash');
const TeamModel = require('../../models/team');
const ProfileModel = require('../../models/profile');

const { getApiError } = require('../../utils/apiError');

module.exports = async (req, res) => {
  try {
    const team = await TeamModel.findByIdAndRemove(req.params.teamId);
    if (!team) {
      throw new Error({name: 'NotFound', message: 'Team not found'});
    }

    await ProfileModel.updateMany({ _id: { $in: team.users} }, { $pull: { 'teams': team._id } });
    res.status(200).send();
  } catch (err) {
    const error = getApiError(err);
    const status = error.status || 500;
    return res.status(status).send(_.omit(error, ['status']));
  }
}