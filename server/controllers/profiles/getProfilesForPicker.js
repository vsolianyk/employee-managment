const _ = require('lodash');
const ProfileModel = require('../../models/profile');

const { getApiError } = require('../../utils/apiError');

const pager = require('../../utils/pager');

module.exports = async (req, res) => {
  const query = pager.getPageWithSearchByQuery(req.query);
    try {
    const results = await ProfileModel
      .find({
        '$or': [
          {firstName: new RegExp(query.searchText, 'i')},
          {lastName: new RegExp(query.searchText, 'i')},
          {fullName: new RegExp(query.searchText, 'i')},
          {email: new RegExp(query.searchText, 'i')},
        ]
      })
      .sort({
          lastName: 'asc'
      })
      .skip(query.offset)
      .limit(query.limit)
      .select('firstName lastName email _id');
    
    res.send(results);
  } catch (err) {
    const error = getApiError(err);
    const status = error.status || 500;
    return res.status(status).send(_.omit(error, ['status']));
  }
}
