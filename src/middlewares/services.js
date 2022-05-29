const { EmploymentService } = require('../services');

/**
 * services constant
 * @param {object} req - request data
 * @param {object} res - response data
 * @param {function} next - next function
 * @returns {promise} - return next function
 */
const services = (req, res, next) => {
  res.locals.employmentService = new EmploymentService({
    config: req.app.locals.config,
    logger: req.app.locals.logger,
    dataEmployees: req.app.locals.employees
  });

  return next();
};

module.exports = services;
