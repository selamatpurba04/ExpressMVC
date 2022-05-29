const uuidv4 = require('uuid/v4');

/**
 * setup all required for logging, called first
 * @param  {object}   req  the incoming HTTP request object
 * @param  {object}   res  the HTTP response object
 * @param  {function} next function to move to the next middleware
 * @returns {object}        whatever "next" returns
 */
const setupRequestLogger = (req, res, next) => {
  res.locals.id = req.get('x-request-id') || uuidv4();
  const {
    method, path, query, httpVersion
  } = req;
  const { headers } = req;

  const opts = {
    id: res.locals.id,
    method,
    path,
    query,
    headers,
    httpVersion,
    source: {
      remoteAddress: req.ip,
      userAgent: req.get('User-Agent')
    }
  };

  res.locals.logger = req.app.locals.logger.child(opts);
  return next();
};

module.exports = setupRequestLogger;
