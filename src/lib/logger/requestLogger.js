
/**
 * log incoming request, called after "setupRequestLogger"
 * @param  {object}   req  the incoming HTTP request object
 * @param  {object}   res  the HTTP response object
 * @param  {function} next function to move to the next middleware
 * @returns {object}        whatever "next" returns
 */
 const requestLogger = (req, res, next) => {
  const { locals } = res;
  locals.requestTimestamp = new Date();
  locals.logger.trace({
    event: 'request'
  }, `${req.method} ${req.url} HTTP/${req.httpVersion} Host: ${req.hostname}`);
  return next();
};

module.exports = requestLogger;
