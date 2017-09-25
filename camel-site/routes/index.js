var express = require('express');
var router = express.Router();
var calculator = require('../helpers/camel-up')



/* GET home page. */
router.get('/', function(req, res, next) {
	var camels = [
		{ "color": "red" },
		{ "color": "green" },
		{ "color": "blue" },
		{ "color": "white" },
		{ "color": "yellow" }
	];
  res.render('index', { title: 'The Camel Calculator', camels: camels });
});

/* POST stats page */
router.post('/stats', function(req, res, next) {
	var camels = [];

	console.log('body', req.body)

	for(var i in camels) {
		var space = req.body[camels[i].color + '-space'];
		var stack = req.body[camels[i].color + '-stack'];
		var rolled = req.body[camels[i].color + '-rolled'];

		camels.push({
			'color': camels[i].color,
			'space': space,
			'stack': stack,
			'rolled': rolled
		});
	}

	console.log('camels', camels);

	// var results;
	// setTimeout(function() {
	// 	results = 

	// 	console.log('stats', results);
	// }, 0);
	res.render('stats', { title: 'The Camel Stats', stats: calculator.calculateOdds(camels) })

});

module.exports = router;
