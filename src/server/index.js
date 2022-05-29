const fs = require('fs');
const YAML = require('yamljs');

const { MicroserviceInit } = require('../lib');

const routes = require('../routes');
const config = require('../../config');
const setupMiddlewares = require('../middlewares');

const swaggerYaml = fs.readFileSync('./docs/swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(swaggerYaml);

const { default: { enabledSwagger } } = config;

/**
 * array of initializations functions. will be run on server startup. (on MicroserviceInit.prototype.start)
 * @param {array} app - app
 */
const initializations = [];

const middlewares = {
  pre: [
    ...setupMiddlewares
  ],
  post: []
};

/**
 * array of deinitializations functions. will be run on server shutdown. (on MicroserviceInit.prototype.stop)
 * @param {array} app - app
 */
const deinitializations = [];

/**
 * Flag Activation of Swagger feature
 */
let payloadSwagger;
if (enabledSwagger) {
  payloadSwagger = { docs: swaggerDocument };
}

/**
 * instantiation of MicroserviceInit. This has not made the server start listening!!!
 */
const ms = new MicroserviceInit({
  config,
  initializations,
  middlewares,
  deinitializations,
  routes,
  ...payloadSwagger
});

/**
 * start listening on predefined host and port. (passed on instantiation)
 */
ms.listen();

/**
 * stopServer
 * @param {object} signal - signal object
 * @returns {function} - stop signal
 */
const stopServer = (signal) => {
  return ms.stop(signal);
};

process.on('SIGINT', stopServer);
process.on('SIGTERM', stopServer);
