
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//custom validators
function required(val) {
	if(val) {
		return true;
	}
	return false;
}

var customReq = [required, "The {PATH} field is required"];


var TagSchema = new Schema({
	tagName : {type: String, unique: true}, //note: returns E11000 error not validation error
	description : {type: String, text: true, validate: customReq},
	posts : [String],
	users: [{name: String, useNo: {type: Number, default: 1}}],
	creator: String,
	createdAt: {type: Date, default: Date.now},
	updateAt: {type: Date, default: Date.now}
});

mongoose.model('Tags', TagSchema);