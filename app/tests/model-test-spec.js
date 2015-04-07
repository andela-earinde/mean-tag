var app = require('../../server.js'),
    mongoose = require('mongoose'),
    Tags = mongoose.model('Tags'),
    tag;

describe("tag-Model Test", function() {
    
    beforeEach(function(done) {
        tag = new Tags({
        	tagName: 'Javascript',
        	description: 'A crappy language'
        }); 
    
        done();         
    });

    afterEach(function(done) {
        Tags.remove(function(err) {
        	if(err) {
        		console.log(err);
        	}
        });
        done();
    });

    describe("Test if the save method works properly", function() {
        it("should be able to save without problems", function(done) {
            tag.save(function(err) {
            	expect(err).toBeNull();
            	done();
            })
        });

        it("should throw an error if the tagname is empty", function(done) {
            tag.tagName = "";

            tag.save(function(err) {
                expect(err).not.toBeNull();
                done();
            });
        });

        it("should throw an error if the description is empty", function(done) {
        	tag.description = "";

        	tag.save(function(err) {
        		expect(err).not.toBeNull();
        		done();
        	});
        });
    });
});