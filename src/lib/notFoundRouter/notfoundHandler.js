const { NotFoundError } = require('../errors');

module.exports = async (req, res, next) => {
  if (res.headersSent) {
    next();
  } else {
    next(new NotFoundError(`${req.method} ${req.url} not found`));
  }
};
