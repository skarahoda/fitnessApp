var express = require('express');
var router = express.Router();
var isLoggedIn = require('./isLoggedIn');

/* GET users listing. */
router.get('/', function (req, res) {
	res.send('respond with a resource');
});

/* GET login page. */
router.get('/login', function (req, res) {
	res.render('login');
});

// route for showing the profile page
router.get('/profile', isLoggedIn, function (req, res) {
	res.render('profile');
});

// route for logging out
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

/* POST user info. */
router.post('/myInfo', isLoggedIn, function (req, res) {
	res.status(200).json({
		name: req.user.name,
		id: req.user.id,
		weight: req.user.weight,
		height: req.user.height,
		isGoogleConnected: (req.user.google.id != null)
	});
});

/* POST user info. */
router.post('/update', isLoggedIn, function (req, res) {
	req.user.name = req.body.name;
	req.user.weight = req.body.weight;
	req.user.height = req.body.height;

	req.user.save(function (err, user) {
		if (err) {
			res.status(500).send(err)
		}
		res.status(200).json({
			name: user.name,
			id: user.id,
			weight: user.weight,
			height: user.height,
			isGoogleConnected: (user.google.id != null)
		});
	});
});

module.exports = function (passport) {


	// =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	router.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

	// handle the callback after facebook has authenticated the user
	router.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect: '/',
			failureRedirect: '/'
		}));

	// =====================================
	// GOOGLE ROUTES =======================
	// =====================================
	// send to google to do the authentication
	// profile gets us their basic information including their name
	// email gets their emails
	router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	// the callback after google has authenticated the user
	router.get('/auth/google/callback',
		passport.authenticate('google', {
			successRedirect: '/',
			failureRedirect: '/'
		}));
	return router
};

