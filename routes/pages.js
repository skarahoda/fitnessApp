var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/dashboard', isLoggedIn, function (req, res) {
	res.render('dashboard');
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}

module.exports = router;
