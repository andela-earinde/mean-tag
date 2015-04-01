process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
    express = require('./config/express');

var db = mongoose();

var dbStatus = db.connection;

dbStatus.on('error', console.error.bind(console, 'connection:error'));

var app  = express();

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
	console.log("server runnning at http://localhost:"+app.get('port'));
});

module.exports = app;
