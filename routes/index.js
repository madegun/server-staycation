var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const alertStatus = req.flash("alertStatus");
  const alertMessage = req.flash("alertMessage");
  const alert = req.flash({status: alertStatus, message: alertMessage});
  res.render('index', { 
    title: 'StayCation | Admin',
    alert
  });
});

module.exports = router;
