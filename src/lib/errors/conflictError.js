const SystemError = require('./systemError');

/**
 * ConflictError
 *
 * Is thrown if the resource could not be found. This is often used
 * as a catch-all for all invalid URIs requested of the server.
 * This will lead to an HTTP 409 (Conflict) status code.
 *
 * @class ConflictError
 * @extends {SystemError}
 */
class ConflictError extends SystemError {

  /**
   * Creates an instance of ConflictError.
   * @param {string} message - the error message, defaults to: 'Conflict'.
   * @param {Object} data - the error object and/or additional data.
   * @memberof ConflictError
   */
  constructor(message, data) {
    // Create the error using our Error code and the appropriate HTTP status code.
    super(message || 'Conflict', 'CONFLICT', 409, data);
  }
}

module.exports = ConflictError;
