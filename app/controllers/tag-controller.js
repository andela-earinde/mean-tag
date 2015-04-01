
var Tags = require('mongoose').model('Tags');

exports.get = function(req, res) {
    Tags.find({}, function(err, result){
        if(err) {
            res.json({error: "The tag list is empty"});
        }
        else if(result) {
            res.json(result);
        }
    });	
}

exports.create = function(req, res) {
    var tag = new Tags();
    tag.tagName = req.body.tagName;
    tag.description = req.body.description;
    tag.posts.push(req.body.posts);
    tag.users.push({name: req.body.users});

    tag.save(function(err) {
        if(err) {         
            if(err.code === 11000) {
                res.json({error: "This tag already exists"});
            }
            if(err.errors) {
                res.json(err.errors.description);
            }        	
        }
        else {
        	res.json({success: "Tag created"});
        }
    });
}

exports.update = function(req, res) {
    
}