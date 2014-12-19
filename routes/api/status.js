var models = require('../../lib/models');
var express = require('express');
var router = express.Router();
var middlewares = require('../../lib/middlewares');

router.use(middlewares.requiresLogin);
router.use(middlewares.getUserFromAuth);

router.get('/:context', function(req, res, next) {
  var context = req.params.context;

  models.Status.getLatestForUser(req.user.id, function(err, status) {
    if (err) return next(err);
    res.json(status || {});
  });
});

router.post('/', function(req, res, next) {

  var status = new models.Status({
    _uid: req.user.id,
    status: req.body.status,
    details: req.body.details
  });

  status.save(function(err) {
    if (err) return next(err);
    res.json(status);
  });

});

module.exports = router;