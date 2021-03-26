module.exports = function (req, res, next) {
  const status = 404;

  const message = req.url + " is not found (please check your REQUEST METHOD if requested URL really exists).";

  res.status(status);

  req.logger.error(status, message);

  res.answerWith(status, message);
};
