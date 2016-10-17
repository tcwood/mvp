var express = require('express');

var app = express();

// app.use(express.static(__dirname + '/client'));


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/eventAdder.html')
});

app.get('/calendar', function(req, res) {
  app.use(express.static(__dirname + '/client'));  
  res.sendFile(__dirname + '/client/index.html')
});


app.listen('3000', function() {
  console.log('server listening on port 3000');
})

module.exports = app;