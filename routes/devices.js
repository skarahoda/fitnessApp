var express = require('express');
var router = express.Router();
var moment = require('moment');
var isLoggedIn = require('./isLoggedIn');

router.get('/page', isLoggedIn, function (req, res) {
	res.render('status');
});

router.post('/info', isLoggedIn, function (req, res) {
	var result = {
		name: 'iPad',
		connectionTime: moment().unix() - 8 * 24 * 60 * 60,
		battery: {
			percent: 20,
			life: 5
		}
	};
	res.status(200).json(result);
});

router.post('/find', isLoggedIn, function (req, res) {
	res.status(200).json({});
});


module.exports = router;
