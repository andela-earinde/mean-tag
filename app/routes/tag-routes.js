var express = require('express');
var router = express.Router();
var index = require('../controllers/tag-controller');

module.exports = function(app) {

	router.route('/tags')

	.get(index.get)

	.post(index.create);

	router.route('/tags/:tag_name')

	.get(index.getTag)

	.put(index.updateTag);

	app.use('/api', router);
}