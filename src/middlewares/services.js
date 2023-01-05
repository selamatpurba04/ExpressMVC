const { EmploymentService } = require('../services');

/**
 * services constant
 * @param {object} req - request data
 * @param {object} res - response data
 * @param {function} next - next function
 * @returns {promise} - return next function
 */
const services = (req, res, next) => {
  const {
    app: {
      locals: {
        config,
        logger,
        employees
      }
    }
  } = req;

  res.locals.employmentService = new EmploymentService({
    config,
    logger,
    dataEmployees: employees
  });

  return next();
};

module.exports = services;
