
var index = require('../controllers/tag-controller');

module.exports = function(app) {
	app.route('/users').post(index.create);
}