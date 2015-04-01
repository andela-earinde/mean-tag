var express = require('express');
var router = express.Router();
var index = require('../controllers/tag-controller');

module.exports = function(app) {

	router.route('/tags')

	.post(index.create);

	app.use('/api', router);
}