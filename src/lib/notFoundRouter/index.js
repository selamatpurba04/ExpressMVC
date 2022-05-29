const express = require('express');
const notFoundHandler = require('./notFoundHandler');

const notFoundRouter = express.Router();

notFoundRouter.all('*', notFoundHandler);

module.exports = notFoundRouter;
