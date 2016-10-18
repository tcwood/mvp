var express = require('express');
var bodyParser = require('body-parser');

var assert = require('assert');

var mongoose = require('mongoose');

var eventController = require('./events/eventController.js')

var app = express();

mongoose.connect('mongodb://localhost/data');

db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('successfully connected to the DB');

})


app.use(express.static(__dirname + '/client'));  
app.use(bodyParser.json());

app.get('/getEvents', eventController.allEvents);

app.post('/addData', eventController.newEvent);

app.get('*', function(req, res){
  res.send('what???', 404);
});

app.listen('3000', function() {
  console.log('server listening on port 3000');
})

module.exports = app;