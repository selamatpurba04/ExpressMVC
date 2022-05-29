/**
 * log whatever response sent. called last
 * @param  {object}   req  the incoming HTTP request object
 * @param  {object}   res  the HTTP response object
 * @param  {function} next function to move to the next middleware
 * @returns {object}        whatever "next" returns
 */
 const responseLogger = (req, res, next) => {
  const { statusCode, locals } = res;

  locals.responseTimestamp = new Date();
  const responseTime = locals.responseTimestamp.getTime() - locals.requestTimestamp.getTime();

  locals.logger.trace({
    event: 'response',
    statusCode,
    responseTime,
    responseHeaders: res.getHeaders()
  }, `HTTP/${req.httpVersion} ${res.statusCode} in ${responseTime} ms`);
  return next();
};

module.exports = responseLogger;
