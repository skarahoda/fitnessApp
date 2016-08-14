var express = require('express');
var router = express.Router();
var isLoggedIn = require('./isLoggedIn');

/* GET home page. */
router.get('/', isLoggedIn, function (req, res) {
	var username = req.user.name;
	res.render('index', {username: username});
});
module.exports = router;
