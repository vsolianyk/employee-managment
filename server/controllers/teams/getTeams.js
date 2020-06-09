const _ = require('lodash');
const TeamModel = require('../../models/team');

const pager = require('../../utils/pager');

const { getApiError } = require('../../utils/apiError');

module.exports = async (req, res) => {
  const query = pager.getSortablePageByQuery(req.query);
  try {
    const results = await TeamModel.find()
      .sort({
          [query.sortBy]: query.sortOrder === 'asc' ? 1 : -1
      })
      .skip(query.offset)
      .limit(query.limit)
      .populate('manager', 'firstName lastName')
      .populate('teamLead', 'firstName lastName');
    const totalCount = await TeamModel.countDocuments();
    
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