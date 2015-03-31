var express = require('express');

module.exports = function() {
	var app = express();
	require('../app/routes/tag-routes')(app);

	return app;
}