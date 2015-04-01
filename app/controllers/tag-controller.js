
var Tags = require('mongoose').model('Tags');
//get all the tags
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

//Create a new Tag
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

//retrieve a Single tag
exports.getTag = function(req, res) {
    Tags.find({tagName: req.params.tag_name}, function(err, result) {
        if(err || result.length === 0) {
            res.json({error: "The tag does not exist"});
        }
        else if(result) {
            res.json(result);
        }
    });
}

exports.updateTag = function(req, res) {
    var tag = req.params.tag_name;
    var update = {req.body, updatedAt: Date.now};
    Tags.findOneAndUpdate({tagName: tag}, update, {upsert: false}, function(err, doc) {
        if(err) {
            res.json(err);
        }
        else if(doc) {
            res.json({success: "Tag updates", update: doc});
        }
    })
}

exports.deleteTag = function(req, res) {

}