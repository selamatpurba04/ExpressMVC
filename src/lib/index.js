const Initializations = require('./initialization');
const ErrorHandler = require('./errorHandler');
const Errors = require('./errors');
const Healthcheck = require('./healthcheck');
const Logger = require('./logger');
const NotFoundRouter = require('./notFoundRouter');
const Utils = require('./utils');
const bodyParser = require('body-parser');

module.exports = {
  ...Initializations,
  ...ErrorHandler,
  ...Errors,
  ...Healthcheck,
  ...Logger,
  ...NotFoundRouter,
  ...Utils,
  bodyParser
}