
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

exports.delete = function(req, res) {
    Tags.remove({}, function(err){
        if(err) {
            res.json({error: "Could not Delete the tags"});
        }
        else{
            res.json({succes: "Tags deleted"});
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

//update a single tag
exports.updateTag = function(req, res) {
    if(!req.body.tagName || !req.body.description) {
        res.json({error: "The tag most have a Name and Description"});
    }
    else{
        var tag = req.params.tag_name;
        var update = {
            tagName: req.body.tagName,
            description: req.body.description,
            updatedAt: Date.now()
        };
        var options = {
            new: true,
            upsert: false
        }
        Tags.findOneAndUpdate({tagName: tag}, update, options, function(err, doc) {
            if(err) {
                res.json(err);
            }
            else if(doc) {
                doc.markModified('updatedAt');
                res.json({success: "Tag updated", update: doc});
            }
        });
    }
}

//delete a single tag
exports.deleteTag = function(req, res) {
    Tags.findOneAndRemove({tagName: req.params.tag_name}, {},function(err, doc) {
        if(err || !doc) {
            res.json({error: "Tag not deleted or does not exists"});
        }
        else {
             res.json({success: "Tag Deleted"});
        }
    })
}