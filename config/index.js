require('dotenv').config();
const pkg = require('../package.json');

const config = {
  name: process.env.SERVICE_NAME || pkg.name,
  description: process.env.SERVICE_DESCRIPTION || pkg.description,
  host: process.env.SERVICE_HOST || '0.0.0.0',
  port: process.env.SERVICE_PORT || 3000,
  api: {
    version: pkg.version
  },
  docs: {
    path: '/docs'
  },
  logger: {
    name: `${pkg.name}-logger`,
    level: process.env.LOG_LEVEL || 'trace'
  },
  default: {
    enabledSwagger: process.env.ENABLED_SWAGGER || true
  }
};

module.exports = config;
