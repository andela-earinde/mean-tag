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

    describe("Tag tests for route /api/tags", function(){
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
                });
        });

        it("should create a new tag when POST /api/tags is called", function(done) {
            request(app).post('/api/tags')
                .send({
                    tagName: "Python",
                    description: "An Awesome language"
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if(err) {
                        console.log(err);
                    }
                    expect(res.body).toEqual({success: "Tag created"});
                    done();
                });
        });

        it("should throw an error when the tagname already exist", function(done) {
            request(app).post('/api/tags')
                .send({
                    tagName: "Javascript",
                    description: "An Awesome language"
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if(err) {
                        console.log(err);
                    }
                    expect(res.body).toEqual({error: "This tag already exists"});
                    done();
                });    
        }); 

        it("should throw an error if the description field is empty", function(done) {
            request(app).post('/api/tags')
                .send({
                    tagName: "Python",
                    description: ""
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).not.toBeNull();
                    done();
                });    
        }); 
    });

    describe("Tag tests for routes /api/tags/:tag_name", function() {
        it("should retreive a single tag when GET /api/tags/:tag_name is called", function(done) {
            request(app).get('/api/tags/Javascript')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if(err) {
                        console.log(err);
                    }
                    expect(res.body.length).toEqual(1),
                    expect(res.body[0]).toEqual(jasmine.objectContaining({
                        tagName: "Javascript",
                        description: "A crappy language"    
                    }));
                    done();
                });       
        });
        
        it("should update a single tag when PUT /api/tags/:tag_name is called", function(done) {
            request(app).put('/api/tags/Javascript')
                .send({
                    tagName: "Javascripting",
                    description: "An Awesome language though"
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if(err) {
                        console.log(err);
                    }
                    expect(res.body).toEqual(jasmine.objectContaining({
                        success: "Tag updated"   
                    }));
                    done();
                });        
        });

        it("should throw an error if the description or name is empty PUT /api/tags/:tag_name is called", function(done) {
            request(app).put('/api/tags/Javascript')
                .send({
                    tagName: "",
                    description: "An Awesome language though"
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if(err) {
                        console.log(err);
                    }
                    expect(res.body).toEqual(jasmine.objectContaining({
                        error: "The tag most have a Name and Description"   
                    }));
                    done();
                });        
        });

        describe("DELETE /api/tags/:tag_name", function() {
            it("should delete a tag when the delete function is called", function(done) {
                request(app).delete('/api/tags/Javascript')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if(err) {
                        console.log(err);
                    }
                    expect(res.body).toEqual({success: "Tag Deleted"});
                    done();
                });     
            });

            it("should throw an error if the tag does not exist", function(done) {
                request(app).delete('/api/tags/Python')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if(err) {
                        console.log(err);
                    }
                    expect(res.body).toEqual({error: "Tag not deleted or does not exists"});
                    done();
                });     
            });
        });          
    });
});