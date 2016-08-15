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

