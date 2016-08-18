var express = require('express');
var moment = require('moment');
var router = express.Router();
var isLoggedIn = require('./isLoggedIn');
var User = require('../models/user');
var Workout = require('../models/workout');


router.post('/user', function (req, res) {
	User.findById(req.body.id, function (err, user) {
		if (err || user == null)
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
		if (err || user == null)
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

router.post('/startWorkout', function (req, res) {
	User.findById(req.body.userId, function (err, user) {
		if (err || user == null)
			res.status('400').json({});
		else {
			workout = new Workout();
			workout.start = req.body.timeStamp;
			workout.end = req.body.timeStamp;
			workout.userId = req.body.userId;
			workout.save();

			user.workouts.push(workout);
			user.save(function (err) {
				if (err) {
					res.status(500).send(err)
				}
				res.status(200).json({workoutId: workout.id})
			});
		}
	});

});

router.post('/stopWorkout', function (req, res) {
	Workout.findById(req.body.workoutId, function (err, workout) {
		if (err || workout == null)
			res.status('400').json({});
		else {
			workout.end = req.body.timeStamp;
			workout.distance = req.body.distance;
			workout.save(function (err) {
				if (err) {
					res.status(500).send(err)
				}
				res.status(200).json({})
			});
		}
	});

});

router.post('/addWorkoutPoint', function (req, res) {
	Workout.findById(req.body.workoutId, function (err, workout) {
		if (err || workout == null)
			res.status('400').json({});
		else {
			workout.points.push({
				latitude: req.body.latitude,
				longitude: req.body.longitude,
				timeStamp: req.body.timeStamp
			});
			workout.save(function (err) {
				if (err) {
					res.status(500).send(err)
				}
				res.status(200).json({})
			});
		}
	});

});

router.post('/deviceInfo', function (req, res) {
	User.findById(req.body.userId, function (err, user) {
		if (err || user == null)
			res.status('400').json({});
		else {
			user.device = {
				name: req.body.name,
				connectionTime: moment().unix(),
				battery:{
					life: req.body.life,
					percent: req.body.percent
				}

			};
			user.save(function (err) {
				if (err) {
					res.status(500).send(err)
				}
				res.status(200).json({})
			});
		}
	});

});

module.exports = router;
