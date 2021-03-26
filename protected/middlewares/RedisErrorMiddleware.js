module.exports = function (req, res, next) {
  if (!req.session) {
    const status = 500;

    const message = "Cache server is not reachable.";

    req.logger.fatal(status, message);

    req.bugSnag.notify(new Error(message));

    res.answerWith(status, message);
  } else {
    next();
  }
};
