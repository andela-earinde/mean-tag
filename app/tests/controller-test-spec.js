var app = require('../../server'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    Tags = mongoose.model('Tags'),
    tag;

describe("Contorller Test: using the routing test method", function() {
    beforeEach(function(done) {
    	tag = new Tags({
    		tagName: "Javascript",
    		description: "A crappy language"
    	});

    	tag.save(function(err){
    		console.log(err);
    	});
    	done();
    });

    afterEach(function(done) {
    	Tags.remove(function(err){
    		if(err) {
    			console.log(err);
    		}
    	});
    	done();
    });

    describe("Tag tests", function(){
        it("should retreive all the tags when the get function is called", function(done) {
            request(app).get('/api/tags/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if(err) {
                    	console.log(err);
                    }
                	expect(res.body.length).toEqual(1);
                    expect(res.body[0]).toEqual(jasmine.objectContaining({
                        tagName: "Javascript",
    		            description: "A crappy language"	
                    }));
                	done();
                })
        });
    });
});