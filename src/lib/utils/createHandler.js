/**
 * base handler for request/response
 * @param {function} handler - request handler
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 * @returns {promise} next
 */
 const createHandler = (handler) => {
  return async (req, res, next) => {
    let error;

    try {
      await handler(req, res);
    } catch (err) {
      error = err;
    }

    return next(error);
  };
};

module.exports = createHandler;
