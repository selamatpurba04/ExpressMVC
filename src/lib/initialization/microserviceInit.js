const express = require('express');
const swaggerUi = require('swagger-ui-express');
const bunyan = require('bunyan');

const { employees } = require('../../constants');
const {
  setupRequestLogger,
  requestLogger,
  responseLogger
} = require('../logger');

const notFoundRouter = require('../notFoundRouter');
const errorHandler = require('../errorHandler');

const healthcheck = require('../healthcheck');

/**
 * The Microservice base class
 */
class MicroserviceInit {

  /**
   * MicroserviceInit constructor
   * @param {object} opts object containing necessary parameters
   * @param {object} opts.config config to be used by the ms
   * and will be passed as this.app.locals.config
   * @param {array} opts.initializations array of initializations function, will be run on start
   * @param {object} opts.middlewares object containing list of middlewares
   * @param {array} opts.middlewares.pre array containing middlewares
   * that will be run before route handler
   * @param {array} opts.middlewares.post array containing middlewares
   * that will be run after route handler
   * @param {array} opts.routes array containing router or middlewares for handling routes
   * @param {array} opts.deinitializations array of deinitialization methods
   * that will be run on shut down
   */
  constructor(opts) {
    Object.assign(this, opts);
    this.app = express();
    this.app.locals.config = this.config;
    this.app.locals.employees = employees;

    this.logger = bunyan.createLogger({
      ...this.config.logger
    });

    this.app.locals.logger = this.logger;

    this.logger.info({ event: 'config', config: this.config });

    this.app.use(setupRequestLogger);
    this.app.use(requestLogger);

    if (this.middlewares && this.middlewares.pre && this.middlewares.pre.length) {
      this.middlewares.pre.forEach(middleware => this.app.use(middleware));
    }

    this.app.use(this.healthcheck || healthcheck);

    if (this.docs) {
      this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(this.docs));
    }

    if (this.routes && this.routes.length) {
      this.routes.forEach(route => this.app.use(route));
    }

    if (this.middlewares && this.middlewares.post && this.middlewares.post.length) {
      this.middlewares.post.forEach(middleware => this.app.use(middleware));
    }

    this.app.use(notFoundRouter);
    this.app.use(errorHandler);
    this.app.use(responseLogger);
  }

  /**
   * set the ms to listen depends on the config given
   * @returns {promise.<object>} return the server itself
   */
  async listen() {
    if (this.initializations && this.initializations.length) {
      try {
        await this.initializations.reduce((p, fn) => p.then(() => fn(this.app)), Promise.resolve());
      } catch (error) {
        this.logger.error({ error }, 'Initializations failed');
        throw error;
      }
    }

    return new Promise((resolve) => {
      this.server = this.app.listen(this.config.port, () => {
        this.logger.info(`${this.config.name} is listening on ${this.config.host}:${this.config.port}`);
        return resolve();
      });
    });
  }

  /**
   * method to stop the server
   * @param  {string} signal signal given
   */
  async stop(signal) {
    this.logger.info({ event: 'shutdown', signal });
    if (this.deinitializations && this.deinitializations.length) {
      await this.deinitializations.reduce((p, fn) => p.then(async () => {
        try {
          await fn(this.app);
        } catch (error) {
          this.logger.error({ error }, 'Deinitializations failed');
        }
      }), Promise.resolve());
    }
    this.server.close();
  }
}

module.exports = {
  MicroserviceInit,
  Router: express.Router
};
