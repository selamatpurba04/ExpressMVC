const SystemError = require('./systemError');

/**
 * ForbiddenError
 *
 * Is thrown if the resource could not be found. This is often used
 * as a catch-all for all invalid URIs requested of the server.
 * This will lead to an HTTP 403 (Forbidden) status code.
 *
 * @class ForbiddenError
 * @extends {SystemError}
 */
class ForbiddenError extends SystemError {

  /**
   * Creates an instance of ForbiddenError.
   * @param {string} message - the error message, defaults to: 'Forbidden'.
   * @param {Object} data - the error object and/or additional data.
   * @memberof ForbiddenError
   */
  constructor(message, data) {
    // Create the error using our Error code and the appropriate HTTP status code.
    super(message || 'Forbidden', 'FORBIDDEN', 403, data);
  }
}

module.exports = ForbiddenError;
