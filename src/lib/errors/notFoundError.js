const SystemError = require('./systemError');

/**
 * NotFoundError
 *
 * Is thrown if the resource could not be found. This is often used
 * as a catch-all for all invalid URIs requested of the server.
 * This will lead to an HTTP 404 (not found) status code.
 *
 * @class NotFoundError
 * @extends {SystemError}
 */
class NotFoundError extends SystemError {

  /**
   * Creates an instance of NotFoundError.
   * @param {string} message - the error message, defaults to: 'Not Found'.
   * @param {Object} data - the error object and/or additional data.
   * @memberof NotFoundError
   */
  constructor(message, data) {
    // Create the error using our Error code and the appropriate HTTP status code.
    super(message || 'Not Found', 'NOT_FOUND', 404, data);
  }
}

module.exports = NotFoundError;
