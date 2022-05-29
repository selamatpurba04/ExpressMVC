const _ = require('lodash');
const changeCase = require('change-case');

/**
 * pick any error and return proper status code
 * @param  {object}   err  error psssed by previous middlewares
 * @param  {object}   req  the incoming HTTP request object
 * @param  {object}   res  the HTTP response object
 * @param  {function} next function to move to the next middleware
 * @returns {object}        whatever "next" returns
 */
const errorHandler = (err, req, res, next) => {
  res.locals.logger.error({
    event: 'error',
    error: _.pick(err, ['name', 'data', 'statusCode', 'code', 'stack'])
  }, err.message);

  res.status(err.statusCode).send({
    ..._.pick(err, ['statusCode', 'code', 'message']),
    error: changeCase.titleCase(err.code)
  });

  return next();
};

module.exports = errorHandler;
