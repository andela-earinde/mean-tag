
exports.render = function(req, res) {
	res.send("Hello World");
}

var User = require('mongoose').model('User');

exports.create = function(req, res, next) {
    var user = new User(req.body);
    console.log(req.body);
    user.save(function(err) {
        if(err) {
        	return next(err);
        }
        else {
        	res.json(user);
        }
    });
}