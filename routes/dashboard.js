var express = require('express');
var router = express.Router();
var isLoggedIn = require('./isLoggedIn');
var moment = require('moment');
var Workout = require('../models/workout');
var geolib = require('geolib');
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
		'end': {$gt: start}
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
			if (workout.start < start)
				workout.start = start;
			if (workout.end > end)
				workout.end = end;
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
	var results = [];
	Workout.find({
		'userId': req.user.id,
		'start': {$lt: end},
		'end': {$gt: start}
	}, function (err, workouts) {
		if (err)
			res.status(400).json([]);
		var result;
		var points;
		var workoutLength = workouts.length;
		var walkingFactor = 0.57;
		var caloriesBurntPerMile = walkingFactor * (req.user.weight * 2.2);
		var strip = req.user.height * 0.415 / 100;
		for (var i = 1; i < workoutLength; i++) {
			points = workouts[i].points;
			var pointsLength = points.length;
			var pointB = {};
			if (pointsLength > 0) {

				result = {
					c: [
						{v: points[0].timeStamp},
						{v: 0},
						{v: 0}
					]
				};
				results.push(result);
				pointB = {
					latitude: points[0].latitude,
					longitude: points[0].longitude
				};
			}
			var calorieBurnt = 0;
			for (var j = 1; j < pointsLength; j++) {
				var pointA = {
					latitude: points[j].latitude,
					longitude: points[j].longitude
				};

				var distance = geolib.getDistance(pointA, pointB);
				calorieBurnt += distance * caloriesBurntPerMile / 1609.344;
				var stepPer5Second = distance * 5 / (strip * (points[j].timeStamp - points[j - 1].timeStamp));
				result = {
					c: [
						{v: points[j].timeStamp},
						{v: stepPer5Second},
						{v: calorieBurnt}
					]
				};
				results.push(result);
				pointB = pointA;
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
		res.status(200).json(results);
	});
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
			'end': {$gt: start}
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
			step = distance * 100 / (req.user.height * 0.415);
			calorie = distance * 0.57 * (req.user.weight * 2.2) / 1609.344;
		}
		var result = {
			step: {
				completed: step,
				goal: dayDifference * 5000
			},
			distance: {
				completed: distance,
				goal: dayDifference * 3000
			},
			calorie: {
				completed: calorie,
				goal: dayDifference * 200
			}
		};
		res.status(200).json(result);
	});

});

module.exports = router;
