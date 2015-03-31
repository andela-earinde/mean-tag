
module.exports = function(app) {
	var index = require('../controllers/tag-controller');

    app.get('/', index.render);
}