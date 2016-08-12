var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
	var title = 'Express';
	if (req.isAuthenticated())
		title = 'Authenticated ' + title;
	res.render('index', {title: title});
});

module.exports = router;
