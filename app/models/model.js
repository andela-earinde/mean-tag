
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//custom validators
function required(val) {
	if(val) {
		return true;
	}
	return false;
}

var customReq = [required, "The {PATH} field is required, please fill it"];


var TagSchema = new Schema({
	tagName : {type: String, unique: true}, //note: returns E11000 error not validation error
	description : {type: String, text: true, validate: customReq},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now}
});

mongoose.model('Tags', TagSchema);