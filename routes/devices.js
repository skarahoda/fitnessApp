var express = require('express');
var router = express.Router();
var moment = require('moment');
var isLoggedIn = require('./isLoggedIn');

router.get('/page', isLoggedIn, function (req, res) {
	res.render('status');
});

router.post('/info', isLoggedIn, function (req, res) {
	res.status(200).json(req.user.device);
});

router.post('/find', isLoggedIn, function (req, res) {
	res.status(200).json({});
});


module.exports = router;
