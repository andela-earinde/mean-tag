var express = require('express');
var router = express.Router();
var index = require('../controllers/tag-controller');

module.exports = function(app) {

	router.route('/tags')

	.get(index.get)

	.post(index.create)

	.delete(index.delete);

	router.route('/tags/:tag_name')

	.get(index.getTag)

	.put(index.updateTag)

	.delete(index.deleteTag);

	app.use('/api', router);

	// catch 404 and forward to error handler
    app.use(function(req, res, next) {
        res.status(404).json({error: "The path does not exist"});
    });
}