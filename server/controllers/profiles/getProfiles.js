const _ = require('lodash');
const ProfileModel = require('../../models/profile');

const { getApiError } = require('../../utils/apiError');

const pager = require('../../utils/pager');

module.exports = async (req, res) => {
  const query = pager.getSortablePageByQuery(req.query);
    try {
    const results = await ProfileModel.find()
        .sort({
            [query.sortBy]: query.sortOrder === 'asc' ? 1 : -1
        })
        .skip(query.offset)
        .limit(query.limit);

    const totalCount = await ProfileModel.countDocuments();
    
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
