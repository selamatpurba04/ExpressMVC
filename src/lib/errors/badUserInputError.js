const SystemError = require('./systemError');

/**
 * BadUserInputError
 *
 * Is thrown if the request could not be fulfilled due to
 * the incorrect syntax of the request. This will lead to an
 * HTTP 400 (bad request) status code.
 *
 * @class BadUserInputError
 * @extends {SystemError}
 */
class BadUserInputError extends SystemError {

  /**
   * Creates an instance of BadUserInputError.
   * @param {string} message - the error message, defaults to: 'Bad User Input'.
   * @param {string} code - the error code, defaults to: 'BAD_USER_INPUT'.
   * @param {Object} data - the error object and/or additional data.
   * @memberof BadUserInputError
   */
  constructor(message, code, data) {
    // Create the error using our Error code and the appropriate HTTP status code.
    super(message || 'Bad User Input', code || 'BAD_USER_INPUT', 400, data);
  }
}

module.exports = BadUserInputError;
