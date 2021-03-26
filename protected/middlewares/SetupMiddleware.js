const moment = require('moment');
const uuid = require('uuid/v4');
const logger = require('../utils/Logger');

module.exports = function (req, res, next) {
  req.ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  req.requestId = uuid();
  req.requestTime = moment();

  req.logger = logger(req.requestId);

  next();
};
