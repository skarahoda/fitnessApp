var express = require('express');
var router = express.Router();
var isLoggedIn = require('./isLoggedIn');
var moment = require('moment');
/* GET home page. */
router.get('/page', isLoggedIn, function (req, res) {
	res.render('dashboard');
});

router.post('/timeActivityInfo', isLoggedIn, function (req, res) {
	console.log(req.body);
	var result = [
		{
			c: [
				{v: "No activity"},
				{v: 10}
			]
		},
		{
			c: [
				{v: "Light Activity"},
				{v: 5}
			]
		},
		{
			c: [
				{v: "Normal Activity"},
				{v: 2}
			]
		},
		{
			c: [
				{v: "Intense Activity"},
				{v: 7}
			]
		}
	];
	res.status(200).json(result);
});

router.post('/stepCalorieInfo', isLoggedIn, function (req, res) {
	var start;
	var end = moment().unix();
	if (req.body.intervalType == 4) {
		start = req.body.start;
		end = req.body.end;
	}
	else {
		var timeDiff = 24 * 60 * 60;
		if (req.body.intervalType == 1) {
			timeDiff *= 7;
		} else if (req.body.intervalType == 2) {
			timeDiff *= 30;
		} else if (req.body.intervalType > 3) {
			timeDiff *= 365;
		}
		start = end - timeDiff;
	}
	console.log(req.body);
	var result = [
		{
			c: [
				{v: moment([2016, 2, 13]).unix()},
				{v: 3},
				{v: 4}
			]
		},
		{
			c: [
				{v: moment([2016, 2, 14]).unix()},
				{v: 2},
				{v: 3}
			]
		},
		{
			c: [
				{v: moment([2016, 2, 15]).unix()},
				{v: 31},
				{v: 6}
			]
		},
		{
			c: [
				{v: moment([2016, 3, 13]).unix()},
				{v: 1},
				{v: 5}
			]
		},
		{
			c: [
				{v: moment([2016, 3, 14]).unix()},
				{v: 2},
				{v: 12}
			]
		}
	];
	res.status(200).json(result);
});

router.post('/totalActivityInfo', isLoggedIn, function (req, res) {
	console.log(req.body);
	var result = {
		step: {
			completed: 5000,
			goal: 10000
		},
		distance: {
			completed: 2000,
			goal: 5000
		},
		calorie: {
			completed: 3000,
			goal: 4000
		}
	};
	res.status(200).json(result);
});

module.exports = router;
