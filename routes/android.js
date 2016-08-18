var express = require('express');
var router = express.Router();
var isLoggedIn = require('./isLoggedIn');

/* GET home page. */
router.get('/hello', function (req, res) {
	res.status('200').json({hello: 'world'});
});

module.exports = router;
