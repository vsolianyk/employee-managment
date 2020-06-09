const _ = require('lodash');
const ProfileModel = require('../../models/profile');
const UserModel = require('../../models/user');

const { getApiError } = require('../../utils/apiError');

const pager = require('../../utils/pager');

module.exports = async (req, res) => {
  const query = pager.getSortablePageByQuery(req.query);
    try {
      const users = await UserModel.find()
        .sort({
            [query.sortBy]: query.sortOrder === 'asc' ? 1 : -1
        })
        .skip(query.offset)
        .limit(query.limit);

    const profiles = await ProfileModel
      .find({'userId': { $in: users.map(i => i._id) }})
      .select('firstName lastName userId');

    const results = users.map(u => {
      const { firstName, lastName } = profiles.find(p => p.userId.toString() === u._id.toString()) || {};
      return {
        ...u.toObject(),
        firstName,
        lastName,
      }
    })

    const totalCount = await UserModel.countDocuments();
    
    res.send({
        limit: query.limit,
        offset: query.offset,
        results,
        totalCount,
    });
  } catch (err) {
    const error = getApiError(err);
    const status = error.status || 500;
    return res.status(status).send(_.omit(error, ['status']));
  }
}
