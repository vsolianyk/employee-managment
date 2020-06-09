const _ = require('lodash');
const TeamModel = require('../../models/team');
const ObjectId = require('mongodb').ObjectID;

const { getApiError } = require('../../utils/apiError');

module.exports = async (req, res) => {
  try {
    const team = await TeamModel  
      .findOne({ _id: ObjectId(req.params.teamId) })
      .populate('users', 'firstName lastName email title')
      .populate('manager', 'firstName lastName email title')
      .populate('teamLead', 'firstName lastName email title');
    if (!team) {
      throw new Error({name: 'NotFound', message: 'Team not found'});
    }

    res.send({ ...team.toObject() });
  } catch (err) {
    const error = getApiError(err);
    const status = error.status || 500;
    return res.status(status).send(_.omit(error, ['status']));
  }
}