const express = require('express');

const healthcheckHandler = require('./handler');

const router = express.Router();

router.get('/healthcheck', healthcheckHandler);

module.exports = router;
