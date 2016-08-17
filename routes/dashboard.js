var express = require('express');
var router = express.Router();
var isLoggedIn = require('./isLoggedIn');

/* GET home page. */
router.get('/page', isLoggedIn, function (req, res) {
	res.render('dashboard');
});

router.post('/timeActivityInfo', isLoggedIn, function (req, res) {
	console.log(req.body);
	var result = {
		"cols": [
			{id: "t", label: "Topping", type: "string"},
			{id: "s", label: "Slices", type: "number"}
		], "rows": [
			{
				c: [
					{v: "Mushrooms"},
					{v: 3}
				]
			},
			{
				c: [
					{v: "Olives"},
					{v: 31}
				]
			},
			{
				c: [
					{v: "Zucchini"},
					{v: 1}
				]
			},
			{
				c: [
					{v: "Pepperoni"},
					{v: 2}
				]
			}
		]
	};
	res.status(200).json(result);
});

router.post('/stepCalorieInfo', isLoggedIn, function (req, res) {
	console.log(req.body);
	var result = {
		"cols": [
			{id: "t", label: "Topping", type: "date"},
			{id: "s", label: "Slices", type: "number"},
			{id: "a", label: "deneme", type: "number"}
		], "rows": [
			{
				c: [
					{v: new Date(2016, 2, 13)},
					{v: 3},
					{v: 4}
				]
			},
			{
				c: [
					{v: new Date(2016, 2, 14)},
					{v: 2},
					{v: 3}
				]
			},
			{
				c: [
					{v: new Date(2016, 2, 15)},
					{v: 31},
					{v: 6}
				]
			},
			{
				c: [
					{v: new Date(2016, 3, 13)},
					{v: 1},
					{v: 5}
				]
			},
			{
				c: [
					{v: new Date(2016, 3, 14)},
					{v: 2},
					{v: 12}
				]
			}
		]
	};
	res.status(200).json(result);
});

module.exports = router;
