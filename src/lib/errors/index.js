const SystemError = require('./systemError');
const NotFoundError = require('./notFoundError');
const BadUserInputError = require('./badUserInputError');
const ForbiddenError = require('./forbiddenError');
const ConflictError = require('./conflictError');

module.exports = {
  SystemError,
  NotFoundError,
  BadUserInputError,
  ForbiddenError,
  ConflictError
}