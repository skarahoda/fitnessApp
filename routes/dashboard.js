var express = require('express');
var router = express.Router();
var isLoggedIn = require('./isLoggedIn');
var moment = require('moment');
var Workout = require('../models/workout');
var dist = require('geo-distance-js');
/* GET home page. */
router.get('/page', isLoggedIn, function (req, res) {
	res.render('dashboard');
});

router.post('/timeActivityInfo', isLoggedIn, function (req, res) {
	var start;
	var end = moment().unix();
	if (req.body.intervalType == 4) {
		start = req.body.from;
		end = req.body.to;
	}
	else {
		var timeDiff = 24 * 60 * 60;
		if (req.body.intervalType == 1) {
			timeDiff *= 7;
		} else if (req.body.intervalType == 2) {
			timeDiff *= 30;
		} else if (req.body.intervalType == 3) {
			timeDiff *= 365;
		}
		start = end - timeDiff;
	}
	Workout.find({
		'userId': req.user.id,
		'start': {$lt: end},
		'end': {$lt: start}
	}, function (err, workouts) {
		if (err)
			res.status(400).json({});
		var light = 0;
		var normal = 0;
		var intense = 0;
		var notActive;
		var workoutLength = workouts.length;
		for (var i = 0; i < workoutLength; i++) {
			var workout = workouts[i];
			if (workout.start < end)
				workout.start = end;
			var speed = workout.distance / (workout.end - workout.start);
			if (speed <= 2)
				light += (workout.end - workout.start);
			else if (speed <= 4)
				normal += (workout.end - workout.start);
			else
				intense += (workout.end - workout.start);
		}
		notActive = (end - start) - (light + normal + intense);
		var result = [
			{
				c: [
					{v: "No activity"},
					{v: notActive / (60 * 60)}
				]
			},
			{
				c: [
					{v: "Light Activity"},
					{v: light / (60 * 60)}
				]
			},
			{
				c: [
					{v: "Normal Activity"},
					{v: normal / (60 * 60)}
				]
			},
			{
				c: [
					{v: "Intense Activity"},
					{v: intense / (60 * 60)}
				]
			}
		];
		res.status(200).json(result);
	});
});

router.post('/stepCalorieInfo', isLoggedIn, function (req, res) {
	var start;
	var end = moment().unix();
	if (req.body.intervalType == 4) {
		start = req.body.from;
		end = req.body.to;
	}
	else {
		var timeDiff = 24 * 60 * 60;
		if (req.body.intervalType == 1) {
			timeDiff *= 7;
		} else if (req.body.intervalType == 2) {
			timeDiff *= 30;
		} else if (req.body.intervalType == 3) {
			timeDiff *= 365;
		}
		start = end - timeDiff;
	}
	var result = [];
	Workout.find({
		'userId': req.user.id,
		'start': {$lt: end},
		'end': {$lt: start}
	}, function (err, workouts) {
		if (err)
			res.status(400).json([]);
		var result;
		var points;
		var workoutLength = workouts.length;
		var walkingFactor = 0.57;
		var caloriesBurntPerMile = walkingFactor * (req.user.weight * 2.2);
		var strip = req.user.height * 0.415;
		for (var i = 1; i < workoutLength; i++) {
			points = workouts[i].points;
			var pointsLength = points.length;
			if (pointsLength > 0) {

				result = {
					c: [
						{v: points[i].timeStamp},
						{v: 0},
						{v: 0}
					]
				};
				results.push(result);
			}
			var calorieBurnt = 0;
			for (var j = 1; i < pointsLength; j++) {
				var distance = dist.getDistance(points[j].latitude, points[j].longitude, points[j - 1].latitude, points[j - 1].longitude);
				calorieBurnt += distance * caloriesBurntPerMile / 1609.344;
				var stepPer5Min = distance * 60 * 5 / (strip * (points[j].timeStamp - points[j - 1].timeStamp));
				result = {
					c: [
						{v: points[j].timeStamp},
						{v: stepPer5Min},
						{v: calorieBurnt}
					]
				};
				results.push(result);
			}
			if (pointsLength > 1) {
				result = {
					c: [
						{v: points[pointsLength - 1].timeStamp},
						{v: 0},
						{v: 0}
					]
				};
				results.push(result);
			}
		}
	});
	res.status(200).json(result);
});

router.post('/totalActivityInfo', isLoggedIn, function (req, res) {
	var start;
	var end = moment().unix();
	if (req.body.intervalType == 4) {
		start = req.body.from;
		end = req.body.to;
	}
	else {
		var timeDiff = 24 * 60 * 60;
		if (req.body.intervalType == 1) {
			timeDiff *= 7;
		} else if (req.body.intervalType == 2) {
			timeDiff *= 30;
		} else if (req.body.intervalType == 3) {
			timeDiff *= 365;
		}
		start = end - timeDiff;
	}
	var dayDifference = ((end - start) / (24 * 60 * 60)).toPrecision(1);
	Workout.aggregate([
		{$match: {
			'userId': req.user.id,
			'start': {$lt: end},
			'end': {$lt: start}
		}},
		{ $group: {
			_id: '$userId',
			totalDistance: {
				$sum: '$distance'
			}
		}}], function (err, results) {
		if (err)
			res.status(400).json({});
		var distance = 0;
		var calorie = 0;
		var step = 0;
		if (results.length > 0) {
			distance = results[0].totalDistance;
			step = distance / (req.user.height * 0.415);
			calorie = distance * 0.57 * (req.user.weight * 2.2) / 1609.344;
		}
		var result = {
			step: {
				completed: step,
				goal: dayDifference * 10000
			},
			distance: {
				completed: distance,
				goal: dayDifference * 5000
			},
			calorie: {
				completed: calorie,
				goal: dayDifference * 35000
			}
		};
		res.status(200).json(result);
	});

});

module.exports = router;
