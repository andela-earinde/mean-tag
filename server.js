
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
    express = require('./config/express');

var db = mongoose();

var dbStatus = db.connection;

dbStatus.on('error', console.error.bind(console, 'connection:error'));

var app  = express();
app.listen(3000, function(){
	console.log("server runnning at http://localhost:3000");
});

module.exports = app;
