const keys = require('../keys');
const helpers = require('../util/helpers');

exports.latestData = function(req, res) {
  const data = helpers.jsonReader(keys.DATA_PATH + 'data.json');
  res.status(200).json(data);
};
