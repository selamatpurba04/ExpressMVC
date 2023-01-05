const os = require('os');

/**
 * handler for healthcheck URI
 * @param  {object}   req  the incoming HTTP request object
 * @param  {object}   res  the HTTP response object
 * @param  {function} next function to move to the next middleware
 * @returns {promise}       whatever "next" returns
 */
const healthcheckHandler = async (req, res, next) => {
  const {
    req: {
      app: {
        locals: {
          config: {
            name,
            api: { version }
          }
        }
      }
    }
  } = req;

  res.send({
    name,
    version,
    uptime: os.uptime()
  });
  return next();
};

module.exports = healthcheckHandler;
