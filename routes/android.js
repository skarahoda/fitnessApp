var express = require('express');
var router = express.Router();
var isLoggedIn = require('./isLoggedIn');
var User = require('../models/user');


router.post('/user', function (req, res) {
	User.findById(req.body.id, function (err, user) {
		if (err)
			res.status('400').json({});
		else {
			res.status('200').json({
				name: user.name,
				weight: user.weight,
				height: user.height
			});
		}
	});

});

router.post('/updateUser', function (req, res) {
	User.findById(req.body.id, function (err, user) {
		if (err)
			res.status('400').json({});
		else {
			user.name = req.body.name || user.name ;
			user.weight = req.body.weight || user.weight ;
			user.height = req.body.height || user.height ;
			user.save(function (err, user) {
				if (err) {
					res.status(500).send(err)
				}
				res.status(200).json({
						name: user.name,
						id: user.id,
						weight: user.weight,
						height: user.height,
						isGoogleConnected: (user.google.id != null)
					})
			});
		}
	});

});

module.exports = router;
