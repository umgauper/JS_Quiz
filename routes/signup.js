var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('signup', { message: 'test2'/*req.flash('signupMessage')*/})
});

module.exports = router;
