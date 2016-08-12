var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
	var title = 'Express';
	if (req.isAuthenticated())
		res.render('index');
	else
		res.render('login');
});

module.exports = router;
