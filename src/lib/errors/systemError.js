const ExtendableError = require('es6-error');

/**
 * SystemError
 *
 * The SystemError is the base class for all errors
 *
 * @class SystemError
 * @extends {ExtendableError}
 */
class SystemError extends ExtendableError {

  /**
   * Creates an instance of SystemError.
   *
   * All Errors have a message an a code. The code is set to specific
   * values in base classes only.
   * @param {string} message - the error message, defaults to: 'System Error'.
   * @param {string} code - the error code, defaults to: 'SYSTEM_ERROR'.
   * @param {number} statusCode - the HTTP status code, defaults to: '500'.
   * @param {Object} data - the error object and/or additional data.
   * @memberof SystemError
   */
  constructor(message = 'System error occurred', code = 'SYSTEM_ERROR', statusCode = 500, data) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.data = data;
  }
}

module.exports = SystemError;
