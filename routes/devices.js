var express = require('express');
var router = express.Router();
var isLoggedIn = require('./isLoggedIn');

/* GET home page. */
router.get('/page', isLoggedIn, function (req, res) {
	res.render('status');
});

module.exports = router;
