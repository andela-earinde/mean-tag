
exports.render = function(req, res) {
	res.send("Hello World");
}

var Tags = require('mongoose').model('Tags');

exports.create = function(req, res, next) {
    var tag = new Tags();
    tag.tagName = req.body.tagName;
    tag.description = req.body.descritpion;
    tag.posts.push(req.body.posts);
    tag.users.push({name: req.body.users});

    tag.save(function(err) {
        if(err) {
        	res.json(err);
        }
        else {
        	res.json(user);
        }
    });
}