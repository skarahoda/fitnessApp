var express = require('express');
var router = express.Router();
var isLoggedIn = require('./isLoggedIn');
var User = require('../models/user');

/* GET home page. */
router.post('/user', function (req, res) {
	User.findById(id, function (err, user) {
		if (err)
			res.status('400').json({});
		else {
			res.status('200').json(user);
		}
	});

});

module.exports = router;
