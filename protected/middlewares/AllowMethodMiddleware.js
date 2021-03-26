const allowedMethod = ["GET", "HEAD", "PATCH", "POST"];

module.exports = function (req, res, next) {
  try {
    if (allowedMethod.indexOf(req.method.toUpperCase()) === -1) {
      res.answerWith(405, "Method Not Allowed");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
