var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
	res.send('respond with a resource');
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}

module.exports = function (passport) {

	// route for showing the profile page
	router.get('/profile', isLoggedIn, function (req, res) {
		res.render('index.pug', {
			user: req.user // get the user out of session and pass to template
		});
	});

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

	// route for logging out
	router.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});
	return router
};

