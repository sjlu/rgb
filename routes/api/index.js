var express = require('express');
var router = express.Router();
var middlewares = require('../../lib/middlewares');

router.use(middlewares.requiresLogin);

router.use('/me', require('./me'));

module.exports = router;