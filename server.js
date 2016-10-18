var express = require('express');
var bodyParser = require('body-parser');

var assert = require('assert');

var mongoose = require('mongoose');

var eventController = require('./events/eventController.js')

var app = express();

mongoose.connect('mongodb://localhost:27017', function(){
  console.log('connected to db!');
});


app.use(express.static(__dirname + '/client'));  
app.use(bodyParser.json());

// app.get('/', function(req, res) {
//   // res.sendFile(__dirname + '/client/index.html')
// });

app.get('/', eventController.allEvents);
app.post('/addData', eventController.newEvent);

// app.post('/addData', function(req, res) {
//   console.log('posting...', req.body);
//   res.sendStatus(201);
// });

app.listen('3000', function() {
  console.log('server listening on port 3000');
})

module.exports = app;